"use client";

import Modal from "@/components/Modal/Modal";
import PetInfoModal from "@/components/Modal/PetInfoModal";
import { useModalStore } from "@/store/modalStore";

export default function Home() {
  const { isOpen, openModal, closeModal } = useModalStore();
  return (
    <div className="absolute top-0 left-0 flex h-screen w-full items-center justify-center">
      <h1 className="text-4xl font-bold text-green-700">멍로드</h1>

      <button onClick={() => openModal("add-pet")}>모달아 열려라</button>
      {isOpen && (
        <Modal hasCloseButton>
          <PetInfoModal type="add-pet" onClose={() => closeModal} />
        </Modal>
      )}
    </div>
  );
}
