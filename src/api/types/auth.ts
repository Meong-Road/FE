import { UserType } from "@/lib/types/user";

import { Response } from "./common";

// Signup
export interface PostSignupReq {
  name: string;
  email: string;
  password: string;
}

export interface PostSignupRes {
  success: boolean;
  code: number;
  message: string;
  result: {
    token: string;
    user: UserType;
    message: string;
  };
}

// Signin
export interface PostSigninReq {
  email: string;
  password: string;
}

export interface PostSigninRes {
  success: boolean;
  code: number;
  message: string;
  result: {
    token: string;
    refreshToken: string;
    user: UserType;
  };
}

// Duplicate Check
export interface GetEmailDuplicateCheckReq {
  email: string;
}

export type GetEmailDuplicateCheckRes = Response<{ exists: boolean }>;

export interface PostNicknameDuplicateCheckReq {
  nickName: string;
}

export type PostNicknameDuplicateCheckRes = Response<boolean>;

// Get User Info
export type GetUserRes = Response<UserType>;
