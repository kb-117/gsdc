import { patientSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const validation = patientSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const patient = await prisma.patient.findUnique({ where: { id: params.id } });

  if (!patient)
    return NextResponse.json({ error: "Invalid patient" }, { status: 404 });

  const updatedPatient = await prisma.patient.update({
    where: { id: params.id },
    data: {
      mrn: body.mrn,
      name: body.name,
      gender: body.gender,
      address: body.address,
      DOB: body.DOB,
      isInsured: body.isInsured,
    },
  });

  return NextResponse.json(updatedPatient);
}
