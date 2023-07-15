'use client'

import useConfirmModal from "@/app/hooks/useConfirmModal";
import { useState } from "react";
import Heading from "../Heading";
import Modal from "./Modal";


interface ConfirmProps {
  seats: Number[];
  movietitle: string;
  watchdate: Date;
  
  onConfirm: ()=>void;
}

const ConfirmModal = ({
  seats,
  watchdate,
  movietitle,
 onConfirm
}: ConfirmProps) => {
  const confirmModal = useConfirmModal();
  const [isLoading, setIsLoading] = useState(false);

  
  const bodyContent = (
    <div className="flex flex-col gap-4 justify-center">
      <Heading
        title="CONFIRM PAYMENT"
        subtitle={`Confirm tickets for ${movietitle} on ${watchdate} seat ${seats} ?`}
        center
      />
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={confirmModal.isOpen}
      onClose={confirmModal.onClose}
      onSubmit={onConfirm} // Pass selected seats to onSubmit
      body={bodyContent}
      actionLabel="CONFIRM"
      title="PAYMENT"
    />
  );
};

export default ConfirmModal;
