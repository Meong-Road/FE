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
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
  isPetInfoSubmitted: true,
  createdAt: "2025-08-10T08:11:47.301Z",
  updatedAt: "2025-09-10T08:11:47.301Z",
};

export const USERS = [
  {
    id: 1,
    email: "happypuppy@test.com",
    name: "김민준",
    nickName: "해피집사",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    isPetInfoSubmitted: true,
    createdAt: "2025-08-10T08:11:47.301Z",
    updatedAt: "2025-09-10T08:11:47.301Z",
  },
  {
    id: 2,
    email: "maru_dad@test.com",
    name: "이도현",
    nickName: "마루아빠",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
    isPetInfoSubmitted: true,
    createdAt: "2025-09-20T12:11:47.301Z",
    updatedAt: "2025-09-21T12:11:47.301Z",
  },
  {
    id: 3,
    email: "bbori_love@test.com",
    name: "박서아",
    nickName: "뽀리언니",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    isPetInfoSubmitted: true,
    createdAt: "2025-09-19T08:00:00.000Z",
    updatedAt: "2025-09-20T08:00:00.000Z",
  },
  {
    id: 4,
    email: "chocosong@test.com",
    name: "최하은",
    nickName: "초코송이",
    image:
      // "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
      null,
    isPetInfoSubmitted: true,
    createdAt: "2025-09-18T10:30:00.000Z",
    updatedAt: "2025-09-19T10:30:00.000Z",
  },
  {
    id: 5,
    email: "mongsil_sister@test.com",
    name: "정유나",
    nickName: "몽실이누나",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop",
    isPetInfoSubmitted: true,
    createdAt: "2025-09-15T09:00:00.000Z",
    updatedAt: "2025-09-16T09:00:00.000Z",
  },
];
