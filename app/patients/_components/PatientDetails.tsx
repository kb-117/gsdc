import { Patient } from "@prisma/client";
import { Flex, Heading, Text } from "@radix-ui/themes";

const PatientDetails = ({ patient }: { patient: Patient }) => {
  return (
    <>
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
    </>
  );
};

export default PatientDetails;
