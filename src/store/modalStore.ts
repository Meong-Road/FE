import { create } from "zustand";

type ModalType = "first-login" | "add-pet" | "edit-pet" | null;

interface ModalStore {
  isOpen: boolean;
  // 추가
  modalType: ModalType;
  // 파라미터 추가
  openModal: (type: ModalType) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  // 추가
  modalType: null,
  // 파라미터 추가
  openModal: (type) => set({ isOpen: true, modalType: type }),
  closeModal: () => set({ isOpen: false }),
}));
