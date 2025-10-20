import React from "react";

import { UserInfoModalProps } from "./types/userInfoModa";
import { Modal } from ".";

export default function UserInfoModal({
  type,
  onClose,
  userId,
}: UserInfoModalProps) {
  return (
    <>
      <Modal.Title title="프로필 수정하기" />
    </>
  );
}
