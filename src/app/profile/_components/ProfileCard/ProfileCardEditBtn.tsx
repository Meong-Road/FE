import React from "react";

import BtnEdit from "@/assets/images/btn-edit.svg";
import { useUserInfoModalStore } from "@/store/modalStore";

interface ProfileCardEditBtnProps {
  userId: number;
  width?: number;
}

export function ProfileCardEditBtn({
  userId,
  width = 32,
}: ProfileCardEditBtnProps) {
  const { openModal } = useUserInfoModalStore();
  return (
    <button
      onClick={() => openModal("edit-user", userId)}
      className="absolute top-2 right-2 cursor-pointer"
    >
      <BtnEdit width={width} height={width} />
    </button>
  );
}
