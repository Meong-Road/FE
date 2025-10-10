import {
  PostSigninReq,
  PostSigninRes,
  PostSignupReq,
  PostSignupRes,
} from "@/lib/types/auth";

import { customFetch } from "./customFetch";

export const authApi = {
  signup: async (payload: PostSignupReq): Promise<PostSignupRes> => {
    return await customFetch.post<PostSignupRes>("/meong-road/user", {
      body: JSON.stringify(payload),
    });
  },
  signin: async (payload: PostSigninReq): Promise<PostSigninRes> => {
    return await customFetch.post<PostSigninRes>("/meong-road/auth/login", {
      body: JSON.stringify(payload),
    });
  },
  // signout: async (): Promise<PostSignoutRes> => {
};
