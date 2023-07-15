'use client'


import { useState } from "react";
import Heading from "../Heading";
import Modal from "./Modal";

import useDeleteModal from "@/app/hooks/useDeleteModal";

interface DeleteProps {
  seat: Number;
  movietitle: string;
  watchdate: String;
  onConfirm: ()=>void;
}

const DeleteModal = ({
  seat,
  watchdate,
  movietitle,
 onConfirm
}: DeleteProps) => {
  const deletemodal = useDeleteModal();
  const [isLoading, setIsLoading] = useState(false);

  
  const bodyContent = (
    <div className="flex flex-col gap-4 justify-center">
      <Heading
        title="CONFIRM CANCELATION"
        subtitle={`Confirm delete for ${movietitle} on ${watchdate} seat ${seat} ?`}
        center
      />
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={deletemodal.isOpen}
      onClose={deletemodal.onClose}
      onSubmit={() => {
        setIsLoading(true);
        onConfirm();
      }} // Pass selected seat to onSubmit
      body={bodyContent}
      actionLabel="CONFIRM"
      title="CANCEL TICKET"
    />
  );
};

export default DeleteModal;
