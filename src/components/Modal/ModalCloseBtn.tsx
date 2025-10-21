import React from "react";

import { usePetInfoModalStore } from "@/store/modalStore";

import CloseIcon from "../../assets/icons/delete-icon.svg";

export function ModalCloseBtn() {
  const { closeModal } = usePetInfoModalStore();

  return (
    <button
      className="absolute top-4 right-4 cursor-pointer rounded-full p-2 transition-colors duration-300 hover:bg-gray-100 active:bg-gray-200 sm:top-8 sm:right-8"
      type="button"
      onClick={closeModal}
    >
      <CloseIcon />
    </button>
  );
}
