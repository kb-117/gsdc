"use client";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";

interface PatientForm {
  mrn: string;
  name: string;
  phone?: string;
  gender: "male" | "female"; // Use union types for gender
  DOB: string; // Date in ISO format
  isInsured: boolean;
  woreda: string;
  city: string;
  state: string;
}

const NewPatientsPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PatientForm>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<PatientForm> = async (data) => {
    setLoading(true);

    try {
      const response = await fetch("/api/patients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          DOB: new Date(data.DOB).toISOString(), // Ensure correct date format
          address: {
            woreda: data.woreda,
            city: data.city,
            state: data.state,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create patient");
      }

      reset(); // Reset the form after successful submission
      router.push("/patients");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold m-4">Create New Patient</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          <label>MRN:</label>
          <input
            type="text"
            {...register("mrn", { required: "MRN is required" })}
            className="border-b"
          />
          {errors.mrn && <p style={{ color: "red" }}>{errors.mrn.message}</p>}
        </div>

        <div>
          <label>Name:</label>
          <input
            className="border-b"
            type="text"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
        </div>

        <div>
          <label>Phone:</label>
          <input className="border-b" type="text" {...register("phone")} />
        </div>

        <div>
          <label>Gender:</label>
          <select
            className="border-b"
            {...register("gender", { required: "Gender is required" })}
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.gender && (
            <p style={{ color: "red" }}>{errors.gender.message}</p>
          )}
        </div>

        <div>
          <label>Date of Birth:</label>
          <input
            className="border-b"
            type="date"
            {...register("DOB", { required: "Date of Birth is required" })}
          />
          {errors.DOB && <p style={{ color: "red" }}>{errors.DOB.message}</p>}
        </div>

        <div>
          <label>Is Insured:</label>
          <input
            className="border-b"
            type="checkbox"
            {...register("isInsured")}
          />
        </div>

        {/* Address fields */}
        <div>
          <label>Woreda:</label>
          <input
            className="border-b"
            type="text"
            {...register("woreda", { required: "Woreda is required" })}
          />
          {errors.woreda && (
            <p style={{ color: "red" }}>{errors.woreda.message}</p>
          )}
        </div>

        <div>
          <label>City:</label>
          <input
            className="border-b"
            type="text"
            {...register("city", { required: "City is required" })}
          />
          {errors.city && <p style={{ color: "red" }}>{errors.city.message}</p>}
        </div>

        <div>
          <label>State:</label>
          <input
            className="border-b"
            type="text"
            {...register("state", { required: "State is required" })}
          />
          {errors.state && (
            <p style={{ color: "red" }}>{errors.state.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-2 bg-green-600 w-fit m-auto"
        >
          {loading ? "Creating..." : "Create Patient"}
        </button>
      </form>
    </div>
  );
};

export default NewPatientsPage;
