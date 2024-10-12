import prisma from "@/prisma/client";
import { Flex, Heading, Text } from "@radix-ui/themes";
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
      <Heading>
        {patient.name} ({patient.mrn})
      </Heading>
      <Text as="p">Phone Number: {patient.phone}</Text>
      <Text as="p">Date of birth: {patient.DOB.toDateString()}</Text>

      <Flex gap="5">
        <Text>Address</Text>
        <Text>{patient.address.woreda}</Text>
        <Text>{patient.address.city}</Text>
        <Text>{patient.address.state}</Text>
      </Flex>
      <Text>Registered at: {patient.registeredAt.toDateString()}</Text>
    </div>
  );
};

export default PatientDetailPage;
