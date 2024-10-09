import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/prisma/client";

const createPatientSchema = z.object({
  mrn: z.string().min(1).max(255),
  name: z.string().min(2).max(255),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = createPatientSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const newPatient = await prisma.patient.create({
    data: { mrn: body.mrn, name: body.name },
  });

  return NextResponse.json(newPatient, { status: 201 });
}
