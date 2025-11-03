"use client";
import { X } from "lucide-react";

import { useModalStore } from "@/store/modalStore";

import { Modal as ModalComponent } from "../Modal/shared/Modal";
import { ModalTitle } from "../Modal/shared/ModalTitle";

function Modal() {
  const { isOpen, title, content, onClose, closeModal } = useModalStore();
  if (!isOpen) return null;

  const handleCloseModal = () => {
    onClose?.();
    closeModal();
  };

  return (
    <div className="fixed top-0 left-0 h-screen w-full bg-black/50">
      <ModalComponent>
        <div className="relative">
          <ModalTitle title={title} />
          <button
            className="absolute top-1/2 right-6 -translate-y-1/2"
            onClick={handleCloseModal}
          >
            <X className="size-8" />
          </button>
        </div>
        <div className="mx-6">{content}</div>
      </ModalComponent>
    </div>
  );
}

export default Modal;
