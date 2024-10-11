import { z } from "zod";

export const addressSchema = z.object({
  woreda: z
    .string()
    .min(1, { message: "Woreda is required" })
    .max(255, { message: "Woreda can't be longer than 255 characters" }),
  city: z
    .string()
    .min(1, { message: "City is required" })
    .max(255, { message: "City can't be longer than 255 characters" }),
  state: z
    .string()
    .min(1, { message: "State is required" })
    .max(100, { message: "State can't be longer than 100 characters" }),
});

export const patientSchema = z.object({
  mrn: z
    .string()
    .min(1, { message: "MRN is required" })
    .max(255, { message: "MRN can't be longer than 255 characters" }),
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(255, { message: "Name can't be longer than 255 characters" }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be exactly 10 digits" })
    .max(10, { message: "Phone number must be exactly 10 digits" })
    .regex(/^\d{10}$/, { message: "Phone number must be 10 digits" }),
  gender: z
    .union([z.literal("male"), z.literal("female"), z.literal("other")])
    .refine((value) => ["male", "female", "other"].includes(value), {
      message: "Invalid gender selection",
    }),
  DOB: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format. Please use a valid date.",
  }),
  isInsured: z.boolean().optional(),
  address: addressSchema,
});
