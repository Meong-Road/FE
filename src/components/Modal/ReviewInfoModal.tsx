import React from "react";

import { ReviewInfoModalProps } from "./types/reviewInfoModal";
import { Modal } from ".";

export default function ReviewInfoModal({
  type,
  onClose,
  reviewId,
}: ReviewInfoModalProps) {
  console.log(type, onClose, reviewId);
  return (
    <>
      <Modal.Title title="리뷰 수정하기" />
    </>
  );
}
