import { API_ENDPOINTS } from "@/lib/constants/endpoints";
import {
  BookmarkType,
  EGatheringType,
  GatheringType,
  QuickGatheringType,
  RegularGatheringType,
} from "@/lib/types/gathering";
import {
  PaginationRequest,
  PaginationResponse,
  Response,
} from "@/mocks/data/common";

export const gatheringApi = {
  // 정기 모임 목록 조회
  getRegularGatherings: async ({
    page,
    pageSize,
    sortBy,
    sortOrder,
  }: PaginationRequest): Promise<PaginationResponse<RegularGatheringType>> => {
    const response = await fetch(
      `${API_ENDPOINTS.GATHERING}?type=${EGatheringType.REGULAR}&page=${page}&pageSize=${pageSize}&sortBy=${sortBy}&sortOrder=${sortOrder}`,
    );
    return response.json();
  },
  // 번개 모임 목록 조회
  getQuickGatherings: async ({
    page,
    pageSize,
    sortBy,
    sortOrder,
  }: PaginationRequest): Promise<PaginationResponse<QuickGatheringType>> => {
    const response = await fetch(
      `${API_ENDPOINTS.GATHERING}?type=${EGatheringType.QUICK}&page=${page}&pageSize=${pageSize}&sortBy=${sortBy}&sortOrder=${sortOrder}`,
    );
    return response.json();
  },
  // 모임 상세 조회
  getGatheringDetail: async ({
    id,
  }: {
    id: GatheringType["id"];
  }): Promise<Response<GatheringType>> => {
    const response = await fetch(`${API_ENDPOINTS.GATHERING}/${id}`);
    return response.json();
  },
  // 모임 찜 조회
  getIsLiked: async (
    id: GatheringType["id"],
  ): Promise<Response<{ isLiked: boolean }>> => {
    const response = await fetch(`/api/gatherings/${id}/bookmarks`);
    return response.json();
  },
  // 모임 찜하기
  like: async (id: GatheringType["id"]): Promise<Response<void>> => {
    const response = await fetch(`/api/gatherings/${id}/bookmarks`, {
      method: "POST",
    });
    return response.json();
  },
  // 모임 찜 해제
  cancelLike: async (id: GatheringType["id"]): Promise<Response<void>> => {
    const response = await fetch(`/api/gatherings/${id}/bookmarks`, {
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
