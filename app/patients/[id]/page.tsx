import prisma from "@/prisma/client";
import { Box, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { Button } from "antd";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import { HiOutlinePencilSquare } from "react-icons/hi2";

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
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Box>
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
      </Box>
      <Box>
        <Button>
          <Link href={`/patients/${patient.id}/edit`}>
            <HiOutlinePencilSquare /> Edit Issue
          </Link>
        </Button>
      </Box>
    </Grid>
  );
};

export default PatientDetailPage;
