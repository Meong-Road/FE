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
  PostSocialLoginReq,
  PostSocialLoginRes,
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

  signout: async (): Promise<void> => {
    return await customFetch.post<void>(`${API_ENDPOINTS.AUTH}/logout`);
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

  /**
   * OAuth 소셜 로그인 API
   *
   * 프론트엔드가 Google/Kakao로부터 받은 인증 코드를 백엔드로 전송합니다.
   * 백엔드는 이 코드로 소셜 제공자에게 토큰을 요청하고, 사용자 정보를 반환합니다.
   *
   * @param payload - provider, 인증 코드, redirectUri
   * @returns 로그인 응답 (토큰, 사용자 정보)
   */
  socialLogin: async (
    payload: PostSocialLoginReq,
  ): Promise<PostSocialLoginRes> => {
    const platform = payload.provider === "google" ? "google" : "kakao";
    const queryParams = new URLSearchParams({
      code: payload.code,
      redirectUri: payload.redirectUri,
    });

    return await customFetch.get<PostSocialLoginRes>(
      `${API_ENDPOINTS.AUTH}/${platform}?${queryParams.toString()}`,
      {
        skipAuth: true,
      },
    );
  },
};
