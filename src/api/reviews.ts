import qs from "qs";

import {
  GetMyReviewsReq,
  GetMyReviewsRes,
  GetReviewDashboardReq,
  GetReviewDashboardRes,
  GetReviewsByGatheringReq,
  GetReviewsByGatheringRes,
  GetReviewsReq,
  GetReviewsRes,
} from "@/api/types/reviews";
import { API_ENDPOINTS } from "@/lib/constants/endpoints";

import { customFetch } from "./customFetch";

const REVIEW_API = {
  getReviews: async ({
    location = "서울 전체",
    page = 0,
    size = 10,
    sort = ["createdAt", "desc"],
  }: Partial<GetReviewsReq>): Promise<GetReviewsRes> => {
    return await customFetch.get(
      `${API_ENDPOINTS.REVIEW}?${qs.stringify({ location, page, size, sort })}`,
      {
        isPublic: true, // 공개 API - 인증 불필요
      },
    );
  },
  getReviewDashboard: async ({
    location = "서울 전체",
  }: GetReviewDashboardReq): Promise<GetReviewDashboardRes> => {
    return await customFetch.get(
      `${API_ENDPOINTS.REVIEW}/scores?${qs.stringify({ location })}`,
    );
  },
  getReviewsByGathering: async ({
    gatheringId,
    ...params
  }: GetReviewsByGatheringReq): Promise<GetReviewsByGatheringRes> => {
    return await customFetch.get(
      `${API_ENDPOINTS.REVIEW}/gatherings/${gatheringId}?${qs.stringify(params)}`,
    );
  },
  // GET /meong-road/reviews/my - 내 리뷰 목록 조회
  getMyReviews: async ({
    page = 0,
    size = 10,
    sort = ["createdAt", "desc"],
  }: Partial<GetMyReviewsReq>): Promise<GetMyReviewsRes> => {
    return await customFetch.get(
      `${API_ENDPOINTS.REVIEW}/my?${qs.stringify({ page, size, sort })}`,
    );
  },
};

export default REVIEW_API;
