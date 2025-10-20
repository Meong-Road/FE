type PetInfoModalType = "first-login" | "add-pet" | "edit-pet";

export interface PetInfoModalProps {
  type: PetInfoModalType;
  hasCloseBtn?: boolean;
  onClose: () => void;
  petId?: number; // 편집 모드일 때만 필요
}
