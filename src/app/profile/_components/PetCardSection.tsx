"use client";

import Modal from "@/components/Modal/Modal";
import PetInfoModal from "@/components/Modal/PetInfoModal";
import { useModalStore } from "@/store/modalStore";

import { PetAdd } from "./PetAdd";
import { PetCard } from "./PetCard";

export default function PetCardSection() {
  const { isOpen, modalType, closeModal } = useModalStore();
  return (
    <>
      <ul className="flex flex-wrap gap-6">
        <PetCard>
          <PetCard.Image />
          <PetCard.Info name="멍멍이" age="나이" gender="성별" type="견종" />
        </PetCard>
        <PetAdd>
          <PetAdd.Image />
          <PetAdd.Btn />
        </PetAdd>
      </ul>

      {/* 추가 */}
      {isOpen && modalType && (
        <Modal hasCloseButton>
          <PetInfoModal type={modalType} onClose={closeModal} />
        </Modal>
      )}
    </>
  );
}
