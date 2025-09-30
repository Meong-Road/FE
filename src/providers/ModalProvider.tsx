import React from "react";

import {
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalPortal,
  ModalRoot,
} from "@/components/Modal";
import { useModalStore } from "@/store/modalStore";

export default function ModalProvider() {
  const { isOpen, modalType, closeModal, payload } = useModalStore();

  if (!isOpen || !modalType) return null;

  let content: React.ReactNode = null;
  switch (modalType) {
    case "requiredPetInfo":
      content = (
        <div>
          <ModalHeader>반려견 정보를 등록해주세요</ModalHeader>
          <ModalBody>
            <form action=""></form>
          </ModalBody>
          <ModalFooter>등록하기</ModalFooter>
        </div>
      );
      break;
    case "addPetInfo":
      content = (
        <>
          <ModalHeader>반려견 정보를 등록해주세요</ModalHeader>
          <ModalBody>
            <form action=""></form>
          </ModalBody>
          <ModalFooter>등록하기</ModalFooter>
        </>
      );
      break;
    default:
      return null;
  }
  return (
    <ModalPortal>
      <ModalRoot>
        <ModalOverlay onClick={closeModal} />
        <ModalContent>{content}</ModalContent>
      </ModalRoot>
    </ModalPortal>
  );
}
