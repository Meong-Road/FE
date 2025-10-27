"use client";

import {
  AuthRequiredModal,
  PetInfoModal,
  ReviewInfoModal,
  UserInfoModal,
} from "@/components/Modal";

export default function ModalProvider() {
  return (
    <>
      <AuthRequiredModal />
      <PetInfoModal />
      <UserInfoModal />
      <ReviewInfoModal />
    </>
  );
}
