import { create } from "zustand";

interface ModalStore {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  modalType: null,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));
