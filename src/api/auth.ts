import { customFetch } from "@/lib/api/customFetch";
import { API_ENDPOINTS } from "@/lib/constants/endpoints";

import {
  GetEmailDuplicateCheckRes,
  GetUserRes,
  PostNicknameDuplicateCheckRes,
  PostSigninReq,
  PostSigninRes,
  PostSignupReq,
  PostSignupRes,
} from "./types/auth";

export const authApi = {
  signup: async (payload: PostSignupReq): Promise<PostSignupRes> => {
    return await customFetch.post<PostSignupRes>(`${API_ENDPOINTS.USER}`, {
      body: JSON.stringify(payload),
      skipAuth: true,
    });
  },

  signin: async (payload: PostSigninReq): Promise<PostSigninRes> => {
    return await customFetch.post<PostSigninRes>(
      `${API_ENDPOINTS.AUTH}/login`,
      {
        body: JSON.stringify(payload),
        skipAuth: true,
      },
    );
  },

  checkEmailDuplicate: async (email: string): Promise<boolean> => {
    const response = await customFetch.get<GetEmailDuplicateCheckRes>(
      `${API_ENDPOINTS.USER}/exists?email=${encodeURIComponent(email)}`,
    );
    return Boolean(response?.result?.exists);
  },

  checkNicknameDuplicate: async (nickname: string): Promise<boolean> => {
    const response = await customFetch.post<PostNicknameDuplicateCheckRes>(
      `${API_ENDPOINTS.USER}/nickname/check`,
      { body: JSON.stringify({ nickName: nickname }) },
    );
    return Boolean(response?.result);
  },

  getMyInfo: async (): Promise<GetUserRes> => {
    return await customFetch.get(`${API_ENDPOINTS.USER}/my`);
  },
};
