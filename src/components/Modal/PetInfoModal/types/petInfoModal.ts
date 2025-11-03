type PetInfoModalType = "first-login" | "add-pet" | "edit-pet";

export interface PetInfoModalProps {
  type: PetInfoModalType;
  petId?: number; // 편집 모드일 때만 필요
  hasCloseBtn?: boolean;
  onClose: () => void;
  isOpen: boolean;
}
