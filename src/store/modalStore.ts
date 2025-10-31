import { ReactNode } from "react";
import { create } from "zustand";

type PetInfoModalType = "first-login" | "add-pet" | "edit-pet" | null;
type UserInfoModalType = "edit-user" | null;
type ReviewInfoModalType = "edit-review" | "add-review" | null;

interface PetInfoModalStoreProps {
  isOpen: boolean;
  modalType: PetInfoModalType;
  petId?: number; // 편집 모드일 때 사용할 펫 ID
  setModalData: (type: PetInfoModalType, petId?: number) => void;
  openModal: () => void;
  closeModal: () => void;
}

export const usePetInfoModalStore = create<PetInfoModalStoreProps>((set) => ({
  isOpen: false,
  modalType: null as PetInfoModalType,
  petId: undefined,
  setModalData: (type, petId?: number) => set({ modalType: type, petId }),
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false, modalType: null, petId: undefined }),
}));

interface UserInfoModalStoreProps {
  isOpen: boolean;
  modalType: UserInfoModalType;
  userId?: number; // 편집 모드일 때 사용할 유저 ID
  openModal: (type: UserInfoModalType, userId?: number) => void;
  closeModal: () => void;
}
export const useUserInfoModalStore = create<UserInfoModalStoreProps>((set) => ({
  isOpen: false,
  modalType: null as UserInfoModalType,
  userId: undefined,
  openModal: (type, userId) => set({ isOpen: true, modalType: type, userId }),
  closeModal: () => set({ isOpen: false, modalType: null, userId: undefined }),
}));

interface ReviewInfoModalStoreProps {
  isOpen: boolean;
  modalType: ReviewInfoModalType;
  reviewId?: number; // 편집 모드일 때 사용할 리뷰 ID
  gatheringId?: number; // 작성 모드일 때 사용할 모임 ID
  openModal: (type: ReviewInfoModalType, idOrGatheringId?: number) => void;
  closeModal: () => void;
}
export const useReviewInfoModalStore = create<ReviewInfoModalStoreProps>(
  (set) => ({
    isOpen: false,
    modalType: null as ReviewInfoModalType,
    reviewId: undefined,
    gatheringId: undefined,
    openModal: (type, idOrGatheringId?) => {
      if (type === "add-review") {
        set({ isOpen: true, modalType: type, gatheringId: idOrGatheringId });
      } else {
        set({ isOpen: true, modalType: type, reviewId: idOrGatheringId });
      }
    },
    closeModal: () =>
      set({
        isOpen: false,
        modalType: null,
        reviewId: undefined,
        gatheringId: undefined,
      }),
  }),
);

interface AuthRequiredModalStoreProps {
  isOpen: boolean;
  redirectUrl: string;
  openModal: (redirectUrl: string, onClose?: () => void) => void;
  closeModal: () => void;
  onClose?: () => void;
}
export const useAuthRequiredModalStore = create<AuthRequiredModalStoreProps>(
  (set) => ({
    isOpen: false,
    redirectUrl: "",
    openModal: (redirectUrl, onClose) =>
      set({ isOpen: true, redirectUrl, onClose }),
    closeModal: () => set({ isOpen: false, redirectUrl: "" }),
  }),
);

interface ConfirmModalStoreProps {
  isOpen: boolean;
  text: string;
  title: string;
  description: string;
  openModal: (
    text: "참여" | "참여 취소" | "개설 취소",
    title: string,
    description: string,
    onConfirm?: () => Promise<void> | void,
  ) => void;
  closeModal: () => void;
  onConfirm?: () => Promise<void> | void;
}
export const useConfirmModalStore = create<ConfirmModalStoreProps>((set) => ({
  isOpen: false,
  text: "",
  title: "",
  description: "",
  onConfirm: () => {
    return;
  },
  openModal: (text, title, description, onConfirm) =>
    set({ isOpen: true, text, title, description, onConfirm }),
  closeModal: () =>
    set({
      isOpen: false,
      text: "",
      title: "",
      description: "",
      onConfirm: () => {
        return;
      },
    }),
}));
// 모든 모달을 닫는 통합 함수
export const closeAllModals = () => {
  usePetInfoModalStore.getState().closeModal();
  useUserInfoModalStore.getState().closeModal();
  useReviewInfoModalStore.getState().closeModal();
  useAuthRequiredModalStore.getState().closeModal();
  useConfirmModalStore.getState().closeModal();
};

interface ModalStoreProps {
  isOpen: boolean;
  title: string;
  content: string | ReactNode;
  onClose?: () => void;
  openModal: (props: {
    title: string;
    content: string | ReactNode;
    onClose?: () => void;
  }) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalStoreProps>((set) => ({
  isOpen: false,
  title: "",
  content: "",
  onClose: undefined,
  openModal: ({ title, content, onClose }) =>
    set({ isOpen: true, title, content, onClose }),
  closeModal: () =>
    set({ isOpen: false, title: "", content: "", onClose: undefined }),
}));
