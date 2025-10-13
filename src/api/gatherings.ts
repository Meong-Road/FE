import qs from "qs";

import { API_ENDPOINTS } from "@/lib/constants/endpoints";
import { BookmarkType } from "@/lib/types/gatherings";

import {
  CancelLikeReq,
  CancelLikeRes,
  GetGatheringDetailReq,
  GetGatheringDetailRes,
  GetIsLikedReq,
  GetIsLikedRes,
  GetQuickGatheringsReq,
  GetQuickGatheringsRes,
  GetRegularGatheringsReq,
  GetRegularGatheringsRes,
  LikeReq,
  LikeRes,
} from "./types/gatherings";

export const gatheringApi = {
  // 정기 모임 목록 조회
  getRegularGatherings: async (
    params: GetRegularGatheringsReq,
  ): Promise<GetRegularGatheringsRes> => {
    const response = await fetch(
      `${API_ENDPOINTS.GATHERING}/regular?${qs.stringify(params)}`,
    );
    return response.json();
  },
  // 번개 모임 목록 조회
  getQuickGatherings: async (
    params: GetQuickGatheringsReq,
  ): Promise<GetQuickGatheringsRes> => {
    const response = await fetch(
      `${API_ENDPOINTS.GATHERING}/quick?${qs.stringify(params)}`,
    );
    return response.json();
  },
  // 모임 상세 조회
  getGatheringDetail: async ({
    id,
  }: GetGatheringDetailReq): Promise<GetGatheringDetailRes> => {
    const response = await fetch(`${API_ENDPOINTS.GATHERING}/${id}`);
    return response.json();
  },
  // 모임 찜 조회
  getIsLiked: async ({ id }: GetIsLikedReq): Promise<GetIsLikedRes> => {
    const response = await fetch(`${API_ENDPOINTS.GATHERING}/${id}/bookmarks`);
    return response.json();
  },
  // 모임 찜하기
  like: async ({ id }: LikeReq): Promise<LikeRes> => {
    const response = await fetch(`${API_ENDPOINTS.GATHERING}/${id}/bookmarks`, {
      method: "POST",
    });
    return response.json();
  },
  // 모임 찜 해제
  cancelLike: async ({ id }: CancelLikeReq): Promise<CancelLikeRes> => {
    const response = await fetch(`${API_ENDPOINTS.GATHERING}/${id}/bookmarks`, {
      method: "DELETE",
    });
    return response.json();
  },
  // 내가 찜한 모임 목록 조회
  getMyBookmarkedGatherings: async ({
    type,
    page,
    size,
    sort,
  }: BookmarkType) => {
    const queryParams = new URLSearchParams({
      type,
      page: page.toString(),
      size: size.toString(),
      sort,
    });
    const response = await fetch(`/api/gatherings/bookmarks?${queryParams}`);
    return response.json();
  },
};
