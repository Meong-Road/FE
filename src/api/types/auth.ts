import { UserType } from "@/lib/types/user";

import { Response } from "./common";

// Signup
export interface PostSignupReq {
  name: string;
  email: string;
  password: string;
}

export type PostSignupRes = Response<UserType>;

// Signin
export interface PostSigninReq {
  email: string;
  password: string;
}

export type PostSigninRes = Response<UserType>;

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

// OAuth Social Login
export type SocialProvider = "google" | "kakao";

export interface PostSocialLoginReq {
  provider: SocialProvider;
  code: string; // OAuth 인증 코드
}

export interface PostSocialLoginRes {
  success: boolean;
  code: number;
  message: string;
  result: {
    token: string;
    refreshToken: string;
    isPetInfoSubmitted: boolean;
    user: UserType;
  };
}
