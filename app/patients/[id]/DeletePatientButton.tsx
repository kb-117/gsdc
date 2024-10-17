"use client";
import { Spinner } from "@/app/components";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";

const DeletePatientButton = ({ patientId }: { patientId: string }) => {
  const [isDeleting, setDeleting] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="red" disabled={isDeleting}>
          <RiDeleteBin5Line className="inline" /> Delete Patient{" "}
          {isDeleting && <Spinner />}
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
        <AlertDialog.Description>
          Are you sure you want to delete this patient? This action cannot be
          undone!
        </AlertDialog.Description>
        <Flex mt="4" gap="3" justify="end">
          <AlertDialog.Cancel>
            <Button color="gray" variant="soft">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button
              color="red"
              onClick={async () => {
                try {
                  setDeleting(true);
                  await axios.delete("/api/patients/" + patientId);
                  router.push("/patients/list");
                  router.refresh();
                } catch (error) {
                  setError(true);
                  setDeleting(false);
                }
              }}
            >
              Delete Patient
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default DeletePatientButton;
