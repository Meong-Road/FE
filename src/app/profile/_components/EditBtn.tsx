import React from "react";

import BtnEdit from "@/assets/images/btn-edit.svg";

interface EditBtnProps {
  onClick?: () => void;
  width?: number;
}

export default function EditBtn({ onClick, width = 32 }: EditBtnProps) {
  return (
    <div
      onClick={onClick}
      className="absolute top-2 right-2 cursor-pointer opacity-30 transition-opacity hover:opacity-70"
    >
      <BtnEdit width={width} height={width} />
    </div>
  );
}
