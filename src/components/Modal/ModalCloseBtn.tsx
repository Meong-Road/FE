import React from "react";

import { usePetInfoModalStore } from "@/store/modalStore";

import CloseIcon from "../../assets/icons/delete-icon.svg";

export function ModalCloseBtn() {
  const { closeModal } = usePetInfoModalStore();

  return (
    <button
      className="absolute top-6 right-6 cursor-pointer sm:top-10 sm:right-10"
      type="button"
      onClick={closeModal}
    >
      <CloseIcon />
    </button>
  );
}
