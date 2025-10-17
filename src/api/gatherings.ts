import qs from "qs";

import { API_ENDPOINTS } from "@/lib/constants/endpoints";

import {
  DeleteLikeReq,
  DeleteLikeRes,
  GetGatheringReq,
  GetGatheringRes,
  GetIsLikedReq,
  GetIsLikedRes,
  GetJoinedGatheringsReq,
  GetJoinedGatheringsRes,
  GetMyBookmarkedGatheringsReq,
  GetMyBookmarkedGatheringsRes,
  GetMyGatheringsReq,
  GetMyGatheringsRes,
  GetQuickGatheringsReq,
  GetQuickGatheringsRes,
  GetRegularGatheringsReq,
  GetRegularGatheringsRes,
  PostLikeReq,
  PostLikeRes,
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
  getGathering: async ({ id }: GetGatheringReq) => {
    return await customFetch.get<GetGatheringRes>(
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
  like: async ({ id }: PostLikeReq) => {
    return await customFetch.post<PostLikeRes>(
      `${API_ENDPOINTS.GATHERING}/${id}/bookmarks`,
    );
  },
  // 모임 찜 해제
  cancelLike: async ({ id }: DeleteLikeReq): Promise<DeleteLikeRes> => {
    return await customFetch.delete<DeleteLikeRes>(
      `${API_ENDPOINTS.GATHERING}/${id}/bookmarks`,
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
