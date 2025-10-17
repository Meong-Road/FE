import qs from "qs";

import { API_ENDPOINTS } from "@/lib/constants/endpoints";

import {
  CancelLikeReq,
  CancelLikeRes,
  GetGatheringDetailReq,
  GetGatheringDetailRes,
  GetIsLikedReq,
  GetIsLikedRes,
  GetMyBookmarkedGatheringsReq,
  GetMyBookmarkedGatheringsRes,
  GetQuickGatheringsReq,
  GetQuickGatheringsRes,
  GetRegularGatheringsReq,
  GetRegularGatheringsRes,
  LikeReq,
  LikeRes,
} from "./types/gatherings";
import { customFetch } from "./customFetch";

export const gatheringApi = {
  // 정기 모임 목록 조회
  getRegularGatherings: async (params: GetRegularGatheringsReq) => {
    return await customFetch.get<GetRegularGatheringsRes>(
      `${API_ENDPOINTS.GATHERING}/regular?${qs.stringify(params)}`,
      { isPublic: true },
    );
  },
  // 번개 모임 목록 조회
  getQuickGatherings: async (params: GetQuickGatheringsReq) => {
    return await customFetch.get<GetQuickGatheringsRes>(
      `${API_ENDPOINTS.GATHERING}/quick?${qs.stringify(params)}`,
      { isPublic: true },
    );
  },
  // 모임 상세 조회
  getGatheringDetail: async ({ id }: GetGatheringDetailReq) => {
    return await customFetch.get<GetGatheringDetailRes>(
      `${API_ENDPOINTS.GATHERING}/${id}`,
      { isPublic: true },
    );
  },
  // 모임 찜 조회
  getIsLiked: async ({ id }: GetIsLikedReq) => {
    return await customFetch.get<GetIsLikedRes>(
      `${API_ENDPOINTS.GATHERING}/${id}/bookmarks`,
    );
  },
  // 모임 찜하기
  like: async ({ id }: LikeReq) => {
    return await customFetch.post<LikeRes>(
      `${API_ENDPOINTS.GATHERING}/${id}/bookmarks`,
    );
  },
  // 모임 찜 해제
  cancelLike: async ({ id }: CancelLikeReq): Promise<CancelLikeRes> => {
    return await customFetch.delete<CancelLikeRes>(
      `${API_ENDPOINTS.GATHERING}/${id}/bookmarks`,
    );
  },
  // 내가 찜한 모임 목록 조회
  getMyBookmarkedGatherings: async ({
    type,
    page,
    size,
    sort,
  }: GetMyBookmarkedGatheringsReq) => {
    return await customFetch.get<GetMyBookmarkedGatheringsRes>(
      `${API_ENDPOINTS.GATHERING}/bookmarks?${qs.stringify({ type, page, size, sort })}`,
    );
  },
};
