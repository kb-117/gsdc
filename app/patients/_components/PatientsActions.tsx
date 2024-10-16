import React from "react";
import Link from "next/link";
import { Button } from "@radix-ui/themes";

const PatientsActions = () => {
  return (
    <div className="mb-5">
      <Button>
        <Link href="/patients/new">New Patients</Link>
      </Button>
    </div>
  );
};

export default PatientsActions;
