import { customFetch } from "@/lib/api/customFetch";
import { API_ENDPOINTS } from "@/lib/constants/endpoints";

import {
  GetUserRes,
  PutUserImageReq,
  PutUserImageRes,
  PutUserReq,
  PutUserRes,
} from "./types/user";

export const userApi = {
  // GET /meong-road/user/my - 내 회원 정보 확인
  getMyInfo: async (): Promise<GetUserRes> => {
    return await customFetch.get<GetUserRes>(`${API_ENDPOINTS.USER}/my`);
  },

  // PUT /meong-road/user - 내 회원 정보 부분 수정
  updateMyInfo: async (payload: PutUserReq): Promise<PutUserRes> => {
    return await customFetch.put<PutUserRes>(`${API_ENDPOINTS.USER}`, {
      body: JSON.stringify(payload),
    });
  },

  // PUT /meong-road/user/image - 유저 이미지 프로필 업로드 & URL 반환
  uploadUserImage: async (
    payload: PutUserImageReq,
  ): Promise<PutUserImageRes> => {
    const formData = new FormData();
    formData.append("file", payload.image);
    return await customFetch.post<PutUserImageRes>(
      `${API_ENDPOINTS.USER}/${payload.userId}/profile-image`,
      {
        body: formData,
      },
    );
  },

  // PUT /meong-road/user/my - 유저 이미지 URL 수정
  updateUserImageURL: async (imageUrl: string): Promise<PutUserImageRes> => {
    return await customFetch.put<PutUserImageRes>(
      `${API_ENDPOINTS.USER}/image`,
      {
        body: JSON.stringify({ image: imageUrl }),
      },
    );
  },

  // PUT /meong-road/user/my - 유저 반려동물 정보 제출 여부 true로 수정
  updatePetInfoSubmitted: async () => {
    await customFetch.put(`${API_ENDPOINTS.USER}/my`, {
      body: JSON.stringify({ isPetInfoSubmitted: true }),
    });
  },
};
