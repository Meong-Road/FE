export interface UserType {
  id: number;
  email: string;
  name: string;
  nickName: string;
  image: string | null;
  isPetInfoSubmitted: boolean;
  createdAt: string;
  updatedAt: string;
}
