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
  GetJoinedGatheringsReq,
  GetJoinedGatheringsRes,
  GetMyGatheringsReq,
  GetMyGatheringsRes,
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
  getRegularGatherings: async (
    params: GetRegularGatheringsReq,
  ): Promise<GetRegularGatheringsRes> => {
    return await customFetch.get(
      `${API_ENDPOINTS.GATHERING}/regular?${qs.stringify(params)}`,
      { isPublic: true },
    );
  },
  // 번개 모임 목록 조회
  getQuickGatherings: async (
    params: GetQuickGatheringsReq,
  ): Promise<GetQuickGatheringsRes> => {
    return await customFetch.get(
      `${API_ENDPOINTS.GATHERING}/quick?${qs.stringify(params)}`,
      { isPublic: true },
    );
  },
  // 모임 상세 조회
  getGatheringDetail: async ({
    id,
  }: GetGatheringDetailReq): Promise<GetGatheringDetailRes> => {
    return await customFetch.get(`${API_ENDPOINTS.GATHERING}/${id}`, {
      isPublic: true,
    });
  },
  // 모임 찜 조회
  getIsLiked: async ({ id }: GetIsLikedReq): Promise<GetIsLikedRes> => {
    return await customFetch.get(`${API_ENDPOINTS.GATHERING}/${id}/bookmarks`);
  },
  // 모임 찜하기
  like: async ({ id }: LikeReq): Promise<LikeRes> => {
    return await customFetch.post(`${API_ENDPOINTS.GATHERING}/${id}/bookmarks`);
  },
  // 모임 찜 해제
  cancelLike: async ({ id }: CancelLikeReq): Promise<CancelLikeRes> => {
    return await customFetch.delete(
      `${API_ENDPOINTS.GATHERING}/${id}/bookmarks`,
    );
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
    return await customFetch.get(
      `${API_ENDPOINTS.GATHERING}/bookmarks?${queryParams}`,
    );
  },
  // GET /meong-road/gatherings/my - 내가 만든 모임 목록 조회
  getMyGatherings: async ({
    page = 0,
    size = 10,
    sort = ["createdAt", "desc"],
  }: Partial<GetMyGatheringsReq>): Promise<GetMyGatheringsRes> => {
    return await customFetch.get(
      `${API_ENDPOINTS.GATHERING}/my?${qs.stringify({ page, size, sort })}`,
    );
  },
  // GET /meong-road/gatherings/joined - 참석한 모임 목록 조회
  getJoinedGatherings: async ({
    page = 0,
    size = 10,
    sort = ["createdAt", "desc"],
  }: Partial<GetJoinedGatheringsReq>): Promise<GetJoinedGatheringsRes> => {
    return await customFetch.get(
      `${API_ENDPOINTS.GATHERING}/joined?${qs.stringify({ page, size, sort })}`,
    );
  },
};
