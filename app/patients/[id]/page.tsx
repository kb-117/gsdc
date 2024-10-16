import prisma from "@/prisma/client";
import { Box, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditPatientButton from "./EditPatientButton";
import PatientDetails from "../_components/PatientDetails";

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
        <PatientDetails patient={patient} />
      </Box>
      <Box>
        <EditPatientButton patientId={patient.id} />
      </Box>
    </Grid>
  );
};

export default PatientDetailPage;
