import { create } from "zustand";

type ModalType = "first-login" | "add-pet" | "edit-pet" | null;

interface ModalStore {
  isOpen: boolean;
  modalType: ModalType;
  petId?: number; // 편집 모드일 때 사용할 펫 ID
  openModal: (type: ModalType, petId?: number) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  modalType: null,
  petId: undefined,
  openModal: (type, petId) => set({ isOpen: true, modalType: type, petId }),
  closeModal: () => set({ isOpen: false, modalType: null, petId: undefined }),
}));
