import React from "react";

import BtnEdit from "@/assets/images/btn-edit.svg";
import { useReviewInfoModalStore } from "@/store/modalStore";

interface EditBtnProps {
  reviewId: number;
  width?: number;
}

export function EditBtn({ reviewId, width = 32 }: EditBtnProps) {
  const { openModal } = useReviewInfoModalStore();
  return (
    <button
      onClick={() => openModal("edit-review", reviewId)}
      className="absolute top-2 right-2 cursor-pointer"
    >
      <BtnEdit width={width} height={width} />
    </button>
  );
}
