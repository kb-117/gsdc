"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

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
  const { register } = useForm<PatientForm>();
  const router = useRouter();

  const [form, setForm] = useState({
    mrn: "",
    name: "",
    phone: "",
    gender: "",
    DOB: "",
    isInsured: false,
    woreda: "",
    city: "",
    state: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/patients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          DOB: new Date(form.DOB).toISOString(), // Ensure correct date format
          address: {
            woreda: form.woreda,
            city: form.city,
            state: form.state,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create patient");
      }

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

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label>MRN:</label>
          <input
            type="text"
            name="mrn"
            value={form.mrn}
            onChange={handleInputChange}
            required
            className="border-b"
          />
        </div>

        <div>
          <label>Name:</label>
          <input
            className="border-b"
            type="text"
            name="name"
            value={form.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>Phone:</label>
          <input
            className="border-b"
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label>Gender:</label>
          <input
            className="border-b"
            type="text"
            name="gender"
            value={form.gender}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>Date of Birth:</label>
          <input
            className="border-b"
            type="date"
            name="DOB"
            value={form.DOB}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>Is Insured:</label>
          <input
            className="border-b"
            type="checkbox"
            name="isInsured"
            checked={form.isInsured}
            onChange={handleInputChange}
          />
        </div>

        {/* Address fields */}
        <div>
          <label>Woreda:</label>
          <input
            className="border-b"
            type="text"
            name="woreda"
            value={form.woreda}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>City:</label>
          <input
            className="border-b"
            type="text"
            name="city"
            value={form.city}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>State:</label>
          <input
            className="border-b"
            type="text"
            name="state"
            value={form.state}
            onChange={handleInputChange}
            required
          />
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
