import { UserType } from "./user";

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

export interface PostSigninReq {
  email: string;
  password: string;
}

export interface PostSigninRes {
  success: boolean;
  code: number;
  message: string;
  result: {
    accessToken: string;
    refreshToken: string;
    user: UserType;
  };
}

export interface GetUserRes {
  success: boolean;
  code: number;
  message: string;
  result: {
    accessToken: string;
    refreshToken: string;
    user: UserType;
  };
}
