import React from "react";

import EditIcon from "../../../assets/icons/edit-icon.svg";

export function EditButton() {
  return (
    <div
      className="border-primary absolute right-0 bottom-0 flex h-10 w-10 items-center justify-center rounded-full border-2 bg-white shadow-sm transition-all hover:bg-gray-50"
      aria-label="이미지 수정"
    >
      <EditIcon />
    </div>
  );
}
