type UserInfoModalType = "edit-user" | null;

export interface UserInfoModalProps {
  type: UserInfoModalType;
  hasCloseBtn?: boolean;
  onClose: () => void;
  userId: number;
}
