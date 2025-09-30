import { create } from "zustand";

type ModalPayload = unknown;
export type ModalType = "requiredPetInfo" | "addPetInfo" | null;

interface ModalStore {
  isOpen: boolean;
  modalType: ModalType;
  payload?: ModalPayload;
  openModal: (type: ModalType) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  modalType: null,
  payload: undefined,
  openModal: (type) => set({ isOpen: true, modalType: type }),
  closeModal: () => set({ isOpen: false, modalType: null }),
}));
