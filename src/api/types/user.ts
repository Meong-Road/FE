import { UserType } from "@/lib/types/user";

import { Response } from "./common";

// GET /meong-road/user/my - 내 회원 정보 확인
export type GetUserReq = void;
export type GetUserRes = Response<UserType>;

// PUT /meong-road/user/my - 내 회원 정보 부분 수정
export interface PutUserReq {
  name?: string;
  nickName?: string;
}

export type PutUserRes = Response<UserType>;

// PUT /meong-road/user/image - 유저 이미지 프로필 수정
export interface PutUserImageReq {
  image: string;
}

export type PutUserImageRes = Response<UserType>;
