import { UserType } from "@/lib/types/user";

/**
 * Mock 사용자 데이터
 */
export const mockCurrentUser: UserType = {
  id: 1,
  email: "test@test.com",
  name: "멍로드",
  nickName: "멍로드",
  image:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
  isPetInfoSubmitted: true,
  createdAt: "2025-08-10T08:11:47.301Z",
  updatedAt: "2025-09-10T08:11:47.301Z",
};
