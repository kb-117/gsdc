import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/prisma/client";

// Define the Address schema based on the prisma Address type
const addressSchema = z.object({
  woreda: z.string().min(1).max(255),
  city: z.string().min(1).max(255),
  state: z.string().min(1).max(100),
});

// Extend the patient schema with the new fields
const createPatientSchema = z.object({
  mrn: z.string().min(1).max(255),
  name: z.string().min(2).max(255),
  phone: z.string().optional(),
  gender: z.string().min(1).max(20),
  DOB: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  isInsured: z.boolean().optional(),
  address: addressSchema,
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = createPatientSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const { mrn, name, phone, gender, DOB, isInsured = false, address } = body;

  const newPatient = await prisma.patient.create({
    data: {
      mrn,
      name,
      phone,
      gender,
      DOB: new Date(DOB), // Convert string to Date object
      isInsured,
      address,
    },
  });

  return NextResponse.json(newPatient, { status: 201 });
}
