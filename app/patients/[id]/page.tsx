import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: {
    id: string;
  };
}

const PatientDetailPage = async ({ params }: Props) => {
  const patient = await prisma.patient.findUnique({
    where: { id: params.id },
  });

  if (!patient) notFound();
  return (
    <div>
      <p>{patient.name}</p>
      <p>{patient.gender}</p>
      <p>{patient.phone}</p>
      <p>{patient.DOB.toDateString()}</p>
      <p>{patient.address.woreda}</p>
      <p>{patient.address.city}</p>
      <p>{patient.address.state}</p>
      <p>{patient.registeredAt.toDateString()}</p>
    </div>
  );
};

export default PatientDetailPage;
