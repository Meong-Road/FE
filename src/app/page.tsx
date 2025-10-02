"use client";

import Modal from "@/components/Modal/Modal";
import PetInfoModal from "@/components/Modal/PetInfoModal";
import { useModalStore } from "@/store/modalStore";

export default function Home() {
  const isOpen = useModalStore((state) => state.isOpen);
  const openModal = useModalStore((state) => state.openModal);
  return (
    <div className="flex h-screen items-center justify-center">
      <h1 className="text-4xl font-bold text-green-700">멍로드</h1>
      <button onClick={() => openModal()}>모달아 열려라</button>
      {isOpen && (
        <Modal hasCloseButton>
          <PetInfoModal type="edit-pet" />
        </Modal>
      )}
    </div>
  );
}
