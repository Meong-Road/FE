import { create } from "zustand";

type PetInfoModalType = "first-login" | "add-pet" | "edit-pet" | null;
type UserInfoModalType = "edit-user" | null;
type ReviewInfoModalType = "edit-review" | "add-review" | null;

interface PetInfoModalStoreProps {
  isOpen: boolean;
  modalType: PetInfoModalType;
  petId?: number; // 편집 모드일 때 사용할 펫 ID
  openModal: (type: PetInfoModalType, petId?: number) => void;
  closeModal: () => void;
}

export const usePetInfoModalStore = create<PetInfoModalStoreProps>((set) => ({
  isOpen: false,
  modalType: null as PetInfoModalType,
  petId: undefined,
  openModal: (type, petId?: number) =>
    set({ isOpen: true, modalType: type, petId }),
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
  openModal: (type: ReviewInfoModalType, reviewId?: number) => void;
  closeModal: () => void;
}
export const useReviewInfoModalStore = create<ReviewInfoModalStoreProps>(
  (set) => ({
    isOpen: false,
    modalType: null as ReviewInfoModalType,
    reviewId: undefined,
    openModal: (type, reviewId?) =>
      set({ isOpen: true, modalType: type, reviewId }),
    closeModal: () =>
      set({ isOpen: false, modalType: null, reviewId: undefined }),
  }),
);

interface AuthRequiredModalStoreProps {
  isOpen: boolean;
  redirectUrl: string;
  openModal: (redirectUrl: string) => void;
  closeModal: () => void;
}
export const useAuthRequiredModalStore = create<AuthRequiredModalStoreProps>(
  (set) => ({
    isOpen: false,
    redirectUrl: "",
    openModal: (redirectUrl: string) => set({ isOpen: true, redirectUrl }),
    closeModal: () => set({ isOpen: false, redirectUrl: "" }),
  }),
);
