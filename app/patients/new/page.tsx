"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const NewPatientsPage = () => {
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
      <h1>Create New Patient</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>MRN:</label>
          <input
            type="text"
            name="mrn"
            value={form.mrn}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>Name:</label>
          <input
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
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label>Gender:</label>
          <input
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
            type="text"
            name="state"
            value={form.state}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Patient"}
        </button>
      </form>
    </div>
  );
};

export default NewPatientsPage;
