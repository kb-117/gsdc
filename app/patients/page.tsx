import React from "react";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
const PatientsPage = () => {
  return (
    <div>
      <Button>
        <Link href="/patients/new">New Patients</Link>
      </Button>
    </div>
  );
};

export default PatientsPage;
