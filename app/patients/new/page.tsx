"use client";
import { z } from "zod";
import { patientSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { CallOutError, ErrorMessage, Spinner } from "@/app/components";
import {
  Button,
  Checkbox,
  Flex,
  Select,
  Text,
  TextField,
} from "@radix-ui/themes";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./styles.css";

type PatientForm = z.infer<typeof patientSchema>;

const NewPatientsPage = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    control,
    reset,
  } = useForm<PatientForm>({
    resolver: zodResolver(patientSchema),
  });

  const onSubmit: SubmitHandler<PatientForm> = async (data) => {
    try {
      const response = await fetch("/api/patients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          DOB: new Date(data.DOB).toISOString(),
        }),
      });

      // Check if the server responded with an error
      if (!response.ok) {
        const responseData = await response.json();

        // Set field-level or form-level errors based on the response
        if (responseData.fieldErrors) {
          for (const [field, message] of Object.entries(
            responseData.fieldErrors
          )) {
            setError(field as keyof PatientForm, {
              message: message as string,
            });
          }
        } else {
          setError("root", {
            message: "Failed to create patient. Please try again.",
          });
        }
        return;
      }

      reset();
      router.push("/patients");
    } catch (error) {
      setError("root", {
        message: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <div className="max-w-xl">
      {<CallOutError>{errors.root?.message}</CallOutError>}
      <h1 className="text-xl font-bold m-4">Create New Patient</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <TextField.Root placeholder="MRN" {...register("mrn")} />
        {<ErrorMessage>{errors.mrn?.message}</ErrorMessage>}

        <TextField.Root placeholder="Name" {...register("name")} />
        {<ErrorMessage>{errors.name?.message}</ErrorMessage>}

        <TextField.Root placeholder="Phone" {...register("phone")} />
        {<ErrorMessage>{errors.phone?.message}</ErrorMessage>}

        <Select.Root {...register("gender")}>
          <Select.Trigger placeholder="Gender" />
          <Select.Content>
            <Select.Item value="male">Male</Select.Item>
            <Select.Item value="female">Female</Select.Item>
            <Select.Item value="other">Other</Select.Item>
          </Select.Content>
        </Select.Root>
        {<ErrorMessage>{errors.gender?.message}</ErrorMessage>}
        <Controller
          name="DOB"
          control={control}
          render={({ field }) => (
            <DatePicker
              {...field}
              className="custom-date-picker"
              placeholderText="Date of Birth"
            />
          )}
        />

        {<ErrorMessage>{errors.DOB?.message}</ErrorMessage>}

        {/* Address fields */}
        <TextField.Root placeholder="Woreda" {...register("address.woreda")} />
        {<ErrorMessage>{errors.address?.woreda?.message}</ErrorMessage>}

        <TextField.Root placeholder="City" {...register("address.city")} />
        {<ErrorMessage>{errors.address?.city?.message}</ErrorMessage>}

        <TextField.Root placeholder="State" {...register("address.state")} />
        {<ErrorMessage>{errors.address?.state?.message}</ErrorMessage>}

        <Text as="label" size="3">
          <Flex gap="2">
            <Checkbox {...register("isInsured")} /> Patient is Insured
          </Flex>
        </Text>

        <Button disabled={isSubmitting} type="submit">
          {isSubmitting ? (
            <>
              Creating patient <Spinner />
            </>
          ) : (
            "Create Patient"
          )}
        </Button>
      </form>
    </div>
  );
};

export default NewPatientsPage;
