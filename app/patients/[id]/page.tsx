import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditPatientButton from "./EditPatientButton";
import PatientDetails from "../_components/PatientDetails";
import DeletePatientButton from "./DeletePatientButton";

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
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <PatientDetails patient={patient} />
      </Box>
      <Box>
        <Flex direction="column" gap="4">
          <EditPatientButton patientId={patient.id} />
          <DeletePatientButton patientId={patient.id} />
        </Flex>
      </Box>
    </Grid>
  );
};

export default PatientDetailPage;
