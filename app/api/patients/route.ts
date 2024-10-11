import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { patientSchema } from "@/app/validationSchemas";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = patientSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const { mrn, name, phone, gender, DOB, isInsured = false, address } = body;

  const newPatient = await prisma.patient.create({
    data: {
      mrn,
      name,
      phone,
      gender,
      DOB: new Date(DOB),
      isInsured,
      address,
    },
  });

  return NextResponse.json(newPatient, { status: 201 });
}
