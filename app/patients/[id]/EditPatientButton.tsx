import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { HiOutlinePencilSquare } from "react-icons/hi2";

const EditPatientButton = ({ patientId }: { patientId: string }) => {
  return (
    <Button>
      <Link href={`/patients/edit/${patientId}`}>
        <HiOutlinePencilSquare className="inline" /> Edit Patient
      </Link>
    </Button>
  );
};

export default EditPatientButton;
