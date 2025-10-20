import React from "react";

import { UserInfoModalProps } from "./types/userInfoModa";
import { Modal } from ".";

export default function UserInfoModal({
  type,
  hasCloseBtn = true,
  onClose,
  userId,
}: UserInfoModalProps) {
  console.log(type, hasCloseBtn, onClose, userId);
  return (
    <>
      <Modal.Title title="프로필 수정하기" />
    </>
  );
}
