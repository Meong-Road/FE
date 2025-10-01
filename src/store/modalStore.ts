import { create } from "zustand";

export type ModalType = "requiredPetInfo" | "addPetInfo" | "editPetInfo" | null;

interface ModalStore {
  isOpen: boolean;
  modalType: ModalType;
  openModal: (type?: ModalType) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  modalType: null,
  openModal: (type) => set({ isOpen: true, modalType: type }),
  closeModal: () => set({ isOpen: false, modalType: null }),
}));
