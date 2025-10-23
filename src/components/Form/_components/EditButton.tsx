import React from "react";

import EditIcon from "../../../assets/icons/edit-icon.svg";

export function EditButton() {
  return (
    <div
      className="border-primary absolute -right-1 -bottom-1 flex h-8 w-8 items-center justify-center rounded-full border-2 bg-white shadow-sm transition-all hover:bg-gray-50"
      aria-label="이미지 수정"
    >
      <EditIcon />
    </div>
  );
}
