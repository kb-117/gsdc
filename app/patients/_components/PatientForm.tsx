"use client";

import { CallOutError, ErrorMessage, Spinner } from "@/app/components";

import DatePicker from "@/app/components/DatePicker";
import Input from "@/app/components/Input";
import { patientSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Patient } from "@prisma/client";
import { Button } from "@radix-ui/themes";
import { Card } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { BsPersonCircle } from "react-icons/bs";
import { FaMapLocationDot } from "react-icons/fa6";
import { MdOutlineLocalPhone } from "react-icons/md";
import { TbNumber } from "react-icons/tb";
import { z } from "zod";
import GenderSelect from "./GenderSelect";

type PatientFormData = z.infer<typeof patientSchema>;

const PatientForm = ({ patient }: { patient?: Patient }) => {
  const router = useRouter();

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
    control,
    setValue,
  } = useForm<PatientFormData>({
    resolver: zodResolver(patientSchema),
  });

  const onSubmit: SubmitHandler<PatientFormData> = async (data) => {
    try {
      let response;

      if (patient) {
        response = await axios.patch(`/api/patients/${patient.id}`, data);
      } else {
        response = await axios.post("/api/patients", data);
      }

      if (response.data.fieldErrors) {
        for (const [field, message] of Object.entries(
          response.data.fieldErrors
        )) {
          setError(field as keyof PatientFormData, {
            message: message as string,
          });
        }
        return;
      }

      reset();
      router.push("/patients");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data?.fieldErrors) {
        for (const [field, message] of Object.entries(
          error.response.data.fieldErrors
        )) {
          setError(field as keyof PatientFormData, {
            message: message as string,
          });
        }
      } else {
        // General error handling
        setError("root", {
          message: "Something went wrong. Please try again.",
        });
      }
    }
  };

  return (
    <div className="max-w-xl">
      {<CallOutError>{errors.root?.message}</CallOutError>}
      <h1 className="text-xl font-bold m-4">Create New Patient</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Input
          setValue={setValue}
          name="mrn"
          control={control}
          label="MRN"
          prefix={<TbNumber />}
          defaultValue={patient?.mrn}
        />

        {<ErrorMessage>{errors.mrn?.message}</ErrorMessage>}
        <Input
          setValue={setValue}
          label="Name"
          control={control}
          prefix={<BsPersonCircle />}
          name="name"
          defaultValue={patient?.name}
        />
        {<ErrorMessage>{errors.name?.message}</ErrorMessage>}

        <Input
          setValue={setValue}
          label="Phone"
          prefix={<MdOutlineLocalPhone />}
          name="phone"
          control={control}
          defaultValue={patient?.phone}
        />

        {<ErrorMessage>{errors.phone?.message}</ErrorMessage>}

        <GenderSelect
          name="gender"
          control={control}
          setValue={setValue}
          defaultValue={patient?.gender}
        />

        {<ErrorMessage>{errors.gender?.message}</ErrorMessage>}

        <DatePicker
          name="DOB"
          control={control}
          label="🎂Date Of Birth"
          defaultValue={patient?.DOB?.toISOString()}
          setValue={setValue}
        />
        {<ErrorMessage>{errors.DOB?.message}</ErrorMessage>}

        {/* Address fields */}

        <Card title="Address Information" className="flex gap-1 flex-wrap">
          <Input
            setValue={setValue}
            label="Woreda"
            prefix={<FaMapLocationDot />}
            name="address.woreda"
            control={control}
            defaultValue={patient?.address?.woreda}
          />
          {<ErrorMessage>{errors.address?.woreda?.message}</ErrorMessage>}
          <Input
            setValue={setValue}
            label="City"
            prefix={<FaMapLocationDot />}
            name="address.city"
            control={control}
            defaultValue={patient?.address?.city}
          />
          {<ErrorMessage>{errors.address?.city?.message}</ErrorMessage>}
          <Input
            setValue={setValue}
            label="State"
            prefix={<FaMapLocationDot />}
            name="address.state"
            control={control}
            defaultValue={patient?.address?.state}
          />
          {<ErrorMessage>{errors.address?.state?.message}</ErrorMessage>}
        </Card>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            patient ? (
              <>
                Updating Patient <Spinner />
              </>
            ) : (
              <>
                Creating patient <Spinner />
              </>
            )
          ) : patient ? (
            "Update Patient"
          ) : (
            "Create Patient"
          )}
        </Button>
      </form>
    </div>
  );
};

export default PatientForm;
