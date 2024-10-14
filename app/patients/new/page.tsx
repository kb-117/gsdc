"use client";
import CallOutError from "@/app/components/CallOutError";
import DatePicker from "@/app/components/DatePicker";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import { patientSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField } from "@radix-ui/themes";
import { Input } from "antd";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

type PatientForm = z.infer<typeof patientSchema>;

const NewPatientsPage = () => {
  const router = useRouter();

  const {
    register,
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
        <div>
          <Input placeholder="MRN" {...register("mrn")} variant="outlined" />
          {<ErrorMessage>{errors.mrn?.message}</ErrorMessage>}
        </div>

        <TextField.Root placeholder="Name" {...register("name")} />

        {<ErrorMessage>{errors.name?.message}</ErrorMessage>}

        <div>
          <label>Phone:</label>
          <input className="border-b" type="text" {...register("phone")} />
          {<ErrorMessage>{errors.phone?.message}</ErrorMessage>}
        </div>

        <div>
          <label>Gender:</label>
          <select className="border-b" {...register("gender")}>
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {<ErrorMessage>{errors.gender?.message}</ErrorMessage>}
        </div>

        <DatePicker name="DOB" control={control} label="Date Of Birth" />
        {<ErrorMessage>{errors.DOB?.message}</ErrorMessage>}

        {/* Address fields */}
        <div>
          <label>Woreda:</label>
          <input
            className="border-b"
            type="text"
            {...register("address.woreda", { required: "Woreda is required" })}
          />
          {<ErrorMessage>{errors.address?.woreda?.message}</ErrorMessage>}
        </div>

        <div>
          <label>City:</label>
          <input
            className="border-b"
            type="text"
            {...register("address.city", { required: "City is required" })}
          />
          {<ErrorMessage>{errors.address?.city?.message}</ErrorMessage>}
        </div>

        <div>
          <label>State:</label>
          <input
            className="border-b"
            type="text"
            {...register("address.state", { required: "State is required" })}
          />
          {<ErrorMessage>{errors.address?.state?.message}</ErrorMessage>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="px-2 bg-green-600 w-fit m-auto"
        >
          {isSubmitting ? (
            <>
              Creating patient <Spinner />
            </>
          ) : (
            "Create Patient"
          )}
        </button>
      </form>
    </div>
  );
};

export default NewPatientsPage;
