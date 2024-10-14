"use client";
import CallOutError from "@/app/components/CallOutError";
import DatePicker from "@/app/components/DatePicker";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import Input from "@/app/components/Input";
import { patientSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@radix-ui/themes";
import { Card, Select } from "antd";
import { useRouter } from "next/navigation";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { BsPersonCircle } from "react-icons/bs";
import { FaMapLocationDot } from "react-icons/fa6";
import { MdOutlineLocalPhone } from "react-icons/md";
import { TbNumber } from "react-icons/tb";
import { z } from "zod";
import AddressFields from "./AddressFields";

type PatientForm = z.infer<typeof patientSchema>;

const NewPatientsPage = () => {
  const router = useRouter();

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
    control,
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
        body: JSON.stringify(data),
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
        <Input name="mrn" control={control} label="MRN" prefix={<TbNumber />} />

        {<ErrorMessage>{errors.mrn?.message}</ErrorMessage>}
        <Input
          label="Name"
          control={control}
          prefix={<BsPersonCircle />}
          name="name"
        />
        {<ErrorMessage>{errors.name?.message}</ErrorMessage>}

        <Input
          label="Phone"
          prefix={<MdOutlineLocalPhone />}
          name="phone"
          control={control}
        />

        {<ErrorMessage>{errors.phone?.message}</ErrorMessage>}

        <Controller
          name="gender"
          control={control}
          render={({ field }) => (
            <Select {...field} placeholder="⚥ Gender">
              <Select.Option value="male">Male</Select.Option>
              <Select.Option value="female">Female</Select.Option>
              <Select.Option value="other">Other</Select.Option>
            </Select>
          )}
        />

        {<ErrorMessage>{errors.gender?.message}</ErrorMessage>}

        <DatePicker name="DOB" control={control} label="🎂Date Of Birth" />
        {<ErrorMessage>{errors.DOB?.message}</ErrorMessage>}

        {/* Address fields */}

        <Card title="Address Information" className="flex gap-1 flex-wrap">
          <Input
            label="Woreda"
            prefix={<FaMapLocationDot />}
            name="address.woreda"
            control={control}
          />
          {<ErrorMessage>{errors.address?.woreda?.message}</ErrorMessage>}
          <Input
            label="City"
            prefix={<FaMapLocationDot />}
            name="address.city"
            control={control}
          />
          {<ErrorMessage>{errors.address?.city?.message}</ErrorMessage>}
          <Input
            label="State"
            prefix={<FaMapLocationDot />}
            name="address.state"
            control={control}
          />
          {<ErrorMessage>{errors.address?.state?.message}</ErrorMessage>}
        </Card>

        <Button type="submit" disabled={isSubmitting}>
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
