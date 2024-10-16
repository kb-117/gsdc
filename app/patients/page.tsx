import { Table } from "@radix-ui/themes";
import { Link } from "../components/";
import prisma from "@/prisma/client";
import PatientsActions from "./_components/PatientsActions";
import { notFound } from "next/navigation";
const PatientsPage = async () => {
  const patients = await prisma.patient.findMany();
  if (!patients) notFound();
  return (
    <div>
      <PatientsActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              MRN
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Gender
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              DOB
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              phone
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {patients.map((patient) => (
            <Table.Row key={patient.id}>
              <Table.Cell className="hidden md:table-cell">
                <Link href={`/patients/${patient.id}`}>{patient.mrn}</Link>
              </Table.Cell>
              <Table.Cell>
                {" "}
                <Link href={`/patients/${patient.id}`}>{patient.name}</Link>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {patient.gender}
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {" "}
                {patient.DOB.toDateString()}
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {patient.phone}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default PatientsPage;
