type UserInfoModalType = "edit-user" | null;

export interface UserInfoModalProps {
  type: UserInfoModalType;
  onClose: () => void;
  userId: number;
}
