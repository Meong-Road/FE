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
import { customFetch } from "./customFetch";

export const authApi = {
  signup: async (payload: PostSignupReq): Promise<PostSignupRes> => {
    return await customFetch.post<PostSignupRes>(`${API_ENDPOINTS.USER}`, {
      body: JSON.stringify(payload),
    });
  },

  signin: async (payload: PostSigninReq): Promise<PostSigninRes> => {
    return await customFetch.post<PostSigninRes>(
      `${API_ENDPOINTS.AUTH}/login`,
      {
        body: JSON.stringify(payload),
      },
    );
  },

  checkEmailDuplicate: async (email: string): Promise<boolean> => {
    const response = await customFetch.get<GetEmailDuplicateCheckRes>(
      `${API_ENDPOINTS.USER}/exists?email=${encodeURIComponent(email)}`,
      { isPublic: true }, //얘는 Authorization 헤더 붙이면 에러남(403) -> 이메일 중복체크는 비로그인 상태에서 체크해야함.
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
    return await customFetch.get("/meong-road/user/my");
  },
};
