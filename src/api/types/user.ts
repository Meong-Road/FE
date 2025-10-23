import { UserType } from "@/lib/types/user";

import { Response } from "./common";

// GET /meong-road/user/my - 내 회원 정보 확인
export type GetUserReq = void;
export type GetUserRes = Response<UserType>;

// PUT /meong-road/user/my - 내 회원 정보 부분 수정
export interface PutUserReq {
  image?: string;
  nickName?: string;
  isPetInfoSubmitted?: boolean;
}

export type PutUserRes = Response<UserType>;

// PUT /meong-road/user/image - 유저 이미지 프로필 파일 업로드
export interface PutUserImageReq {
  userId: number;
  image: File;
}

// PUT /meong-road/user/image - 유저 이미지 프로필 파일 업로드 응답 - 이미지 URL
export type PutUserImageRes = Response<UserType["image"]>;
