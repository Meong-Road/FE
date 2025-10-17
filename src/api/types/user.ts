import { UserType } from "@/lib/types/user";

import { Response } from "./common";

// GET /meong-road/user/my - 내 회원 정보 확인
export type GetMyInfoRes = Response<UserType>;

// PUT /meong-road/user/my - 내 회원 정보 부분 수정
export interface UpdateMyInfoReq {
  name?: string;
  nickName?: string;
}

export type UpdateMyInfoRes = Response<UserType>;

// PUT /meong-road/user/image - 유저 이미지 프로필 수정
export interface UpdateUserImageReq {
  image: string;
}

export type UpdateUserImageRes = Response<UserType>;
