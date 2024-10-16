import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { HiOutlinePencilSquare } from "react-icons/hi2";

const EditPatientButton = ({ patientId }: { patientId: string }) => {
  return (
    <Button>
      <Link href={`/patients/${patientId}/edit`}>
        <HiOutlinePencilSquare /> Edit Issue
      </Link>
    </Button>
  );
};

export default EditPatientButton;
