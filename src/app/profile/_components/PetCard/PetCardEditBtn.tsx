import React from "react";

import BtnEdit from "@/assets/images/btn-edit.svg";
import { usePetInfoModalStore } from "@/store/modalStore";

interface PetCardEditBtnProps {
  petId: number;
  width?: number;
}

export function PetCardEditBtn({ petId, width = 32 }: PetCardEditBtnProps) {
  const { openModal } = usePetInfoModalStore();
  return (
    <div
      onClick={() => openModal("edit-pet", petId)}
      className="absolute top-2 right-2 cursor-pointer"
    >
      <BtnEdit width={width} height={width} />
    </div>
  );
}
