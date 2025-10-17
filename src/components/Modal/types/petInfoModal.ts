type PetInfoModalType = "first-login" | "add-pet" | "edit-pet";

export interface PetInfoModalProps {
  type: PetInfoModalType;
  onClose: () => void;
}
