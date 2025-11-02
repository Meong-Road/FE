import qs from "qs";

import { customFetch } from "@/lib/api/customFetch";
import { API_ENDPOINTS } from "@/lib/constants/endpoints";

import {
  DeleteGatheringReq,
  DeleteGatheringRes,
  DeleteJoinGatheringReq,
  DeleteJoinGatheringRes,
  DeleteLikeReq,
  DeleteLikeRes,
  GatheringImageUploadReq,
  GatheringImageUploadRes,
  GetGatheringReq,
  GetGatheringRes,
  GetIsLikedReq,
  GetIsLikedRes,
  GetIsParticipatingReq,
  GetIsParticipatingRes,
  GetJoinedGatheringsReq,
  GetJoinedGatheringsRes,
  GetMyBookmarkedGatheringsReq,
  GetMyBookmarkedGatheringsRes,
  GetMyGatheringsReq,
  GetMyGatheringsRes,
  GetParticipantsReq,
  GetParticipantsRes,
  GetQuickGatheringsReq,
  GetQuickGatheringsRes,
  GetRegularGatheringsReq,
  GetRegularGatheringsRes,
  PostGatheringReq,
  PostGatheringRes,
  PostJoinGatheringReq,
  PostJoinGatheringRes,
  PostLikeReq,
  PostLikeRes,
} from "./types/gatherings";

export const gatheringApi = {
  // 정기 모임 목록 조회
  getRegularGatherings: (params: GetRegularGatheringsReq) => {
    return customFetch.get<GetRegularGatheringsRes>(
      `${API_ENDPOINTS.GATHERING}/regular?${qs.stringify(params, {
        arrayFormat: "repeat",
        skipNulls: true,
      })}`,
      { skipAuth: true },
    );
  },
  // 번개 모임 목록 조회
  getQuickGatherings: (params: GetQuickGatheringsReq) => {
    return customFetch.get<GetQuickGatheringsRes>(
      `${API_ENDPOINTS.GATHERING}/quick?${qs.stringify(params, {
        arrayFormat: "repeat",
        skipNulls: true,
      })}`,
      { skipAuth: true },
    );
  },
  // 모임 상세 조회
  getGathering: ({ id }: GetGatheringReq) => {
    return customFetch.get<GetGatheringRes>(
      `${API_ENDPOINTS.GATHERING}/${id}`,
      { skipAuth: true },
    );
  },
  // 모임 찜 조회
  getIsLiked: ({ id }: GetIsLikedReq) => {
    return customFetch.get<GetIsLikedRes>(
      `${API_ENDPOINTS.GATHERING}/${id}/bookmarks`,
    );
  },
  // 모임 찜하기
  like: ({ id }: PostLikeReq) => {
    return customFetch.post<PostLikeRes>(
      `${API_ENDPOINTS.GATHERING}/${id}/bookmarks`,
    );
  },
  // 모임 찜 해제
  cancelLike: ({ id }: DeleteLikeReq) => {
    return customFetch.delete<DeleteLikeRes>(
      `${API_ENDPOINTS.GATHERING}/${id}/bookmarks`,
    );
  },
  // GET /meong-road/gatherings/my - 내가 만든 모임 목록 조회
  getMyGatherings: ({
    page = 0,
    size = 10,
    sort = ["createdAt", "desc"],
    status,
  }: GetMyGatheringsReq) => {
    return customFetch.get<GetMyGatheringsRes>(
      `${API_ENDPOINTS.GATHERING}/my?${qs.stringify({ page, size, sort, status }, { arrayFormat: "comma" })}`,
    );
  },
  // GET /meong-road/gatherings/joined - 참석한 모임 목록 조회
  getJoinedGatherings: ({
    page = 0,
    size = 10,
    sort = ["createdAt", "desc"],
    status,
  }: GetJoinedGatheringsReq) => {
    return customFetch.get<GetJoinedGatheringsRes>(
      `${API_ENDPOINTS.GATHERING}/joined?${qs.stringify({ page, size, sort, status }, { arrayFormat: "comma" })}`,
    );
  },
  // 모임 참여 조회
  getIsParticipating: ({ id }: GetIsParticipatingReq) => {
    return customFetch.get<GetIsParticipatingRes>(
      `${API_ENDPOINTS.GATHERING}/${id}/participation`,
    );
  },
  // POST /meong-road/gatherings/{gatheringId}/join - 모임 참여
  joinGathering: ({ id }: PostJoinGatheringReq) => {
    return customFetch.post<PostJoinGatheringRes>(
      `${API_ENDPOINTS.GATHERING}/${id}/join`,
    );
  },
  // Delete /meong-road/gatherings/{gatheringId}/leave - 모임 참여 취소
  cancelJoinGathering: ({ id }: DeleteJoinGatheringReq) => {
    return customFetch.post<DeleteJoinGatheringRes>(
      `${API_ENDPOINTS.GATHERING}/${id}/leave`,
    );
  },

  // DELETE /meong-road/gatherings/{gatheringId} - 모임 취소
  cancelGathering: ({ id }: DeleteGatheringReq) => {
    return customFetch.delete<DeleteGatheringRes>(
      `${API_ENDPOINTS.GATHERING}/${id}`,
    );
  },
  // 내가 찜한 모임 목록 조회
  getMyBookmarkedGatherings: ({
    type,
    page = 0,
    size = 10,
    sort = ["createdAt", "desc"],
  }: GetMyBookmarkedGatheringsReq) => {
    return customFetch.get<GetMyBookmarkedGatheringsRes>(
      `${API_ENDPOINTS.GATHERING}/bookmarks?${qs.stringify(
        { type, page, size, sort },
        {
          arrayFormat: "comma",
          skipNulls: true,
        },
      )}`,
    );
  },
  getParticipants: ({ id, page, size, sort }: GetParticipantsReq) => {
    return customFetch.get<GetParticipantsRes>(
      `${API_ENDPOINTS.GATHERING}/${id}/participants?${qs.stringify({ page, size, sort }, { arrayFormat: "comma" })}`,
      // TODO: 백엔드 수정 완료 시 주석 제거
      // { skipAuth: true },
    );
  },
  uploadGatheringImage: async ({ file }: GatheringImageUploadReq) => {
    const formData = new FormData();
    formData.append("file", file);

    return customFetch.post<GatheringImageUploadRes>(
      `${API_ENDPOINTS.GATHERING}/image/upload`,
      {
        body: formData,
      },
    );
  },
  postGathering: (data: PostGatheringReq) => {
    return customFetch.post<PostGatheringRes>(`${API_ENDPOINTS.GATHERING}`, {
      body: JSON.stringify(data),
    });
  },
};
