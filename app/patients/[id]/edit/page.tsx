import React from "react";
import PatientForm from "../../_components/PatientForm";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
}

const EditIssuePage = async ({ params }: Props) => {
  const patient = await prisma.patient.findUnique({
    where: { id: params.id },
  });

  if (!patient) notFound();

  return <PatientForm patient={patient} />;
};

export default EditIssuePage;
