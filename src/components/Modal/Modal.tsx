import React from "react";

import PetInfoModal from "./PetInfoModal";

interface ModalProps {
  type: "first-login" | "add-pet" | "edit-pet";
  onClose?: () => void;
}

export default function Modal({ type, onClose }: ModalProps) {
  return (
    <>
      <PetInfoModal type={type} onClose={onClose} />
    </>
  );
}
