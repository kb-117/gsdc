import React from "react";
import { Button, Table } from "@radix-ui/themes";
import Link from "next/link";
import prisma from "@/prisma/client";
const PatientsPage = async () => {
  const patients = await prisma.patient.findMany();
  return (
    <div>
      <div className="mb-5">
        <Button>
          <Link href="/patients/new">New Patients</Link>
        </Button>
      </div>
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
                {patient.mrn}
              </Table.Cell>
              <Table.Cell>{patient.name}</Table.Cell>
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
