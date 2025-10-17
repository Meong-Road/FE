import { API_ENDPOINTS } from "@/lib/constants/endpoints";

import {
  GetUserRes,
  PutUserImageReq,
  PutUserImageRes,
  PutUserReq,
  PutUserRes,
} from "./types/user";
import { customFetch } from "./customFetch";

export const userApi = {
  // GET /meong-road/user/my - 내 회원 정보 확인
  getMyInfo: async (): Promise<GetUserRes> => {
    return await customFetch.get(`${API_ENDPOINTS.USER}/my`);
  },

  // PUT /meong-road/user/my - 내 회원 정보 부분 수정
  updateMyInfo: async (payload: PutUserReq): Promise<PutUserRes> => {
    return await customFetch.put(`${API_ENDPOINTS.USER}/my`, {
      body: JSON.stringify(payload),
    });
  },

  // PUT /meong-road/user/image - 유저 이미지 프로필 수정
  updateUserImage: async (
    payload: PutUserImageReq,
  ): Promise<PutUserImageRes> => {
    return await customFetch.put(`${API_ENDPOINTS.USER}/image`, {
      body: JSON.stringify(payload),
    });
  },
};
