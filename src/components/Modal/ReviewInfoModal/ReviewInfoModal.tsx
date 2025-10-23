import React from "react";

import { Modal } from "../shared";

import { ReviewInfoModalProps } from "./types/reviewInfoModal";

export default function ReviewInfoModal({
  type,
  hasCloseBtn = true,
  onClose,
  reviewId,
}: ReviewInfoModalProps) {
  console.log(type, hasCloseBtn, onClose, reviewId);
  return (
    <Modal>
      {hasCloseBtn && <Modal.CloseBtn />}
      <Modal.Title title="리뷰 수정하기" />
    </Modal>
  );
}
