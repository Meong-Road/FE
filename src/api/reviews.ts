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
  }: Partial<GetReviewsReq>) => {
    return await customFetch.get<GetReviewsRes>(
      `${API_ENDPOINTS.REVIEW}?${qs.stringify({ location, page, size, sort })}`,
      {
        isPublic: true,
      },
    );
  },
  getReviewDashboard: async ({
    location = "서울 전체",
  }: GetReviewDashboardReq) => {
    return await customFetch.get<GetReviewDashboardRes>(
      `${API_ENDPOINTS.REVIEW}/scores?${qs.stringify({ location })}`,
    );
  },
  getReviewsByGathering: async ({
    gatheringId,
    ...params
  }: GetReviewsByGatheringReq) => {
    return await customFetch.get<GetReviewsByGatheringRes>(
      `${API_ENDPOINTS.REVIEW}/gatherings/${gatheringId}?${qs.stringify(params)}`,
      {
        isPublic: true,
      },
    );
  },
  getMyReviews: async ({
    page = 0,
    size = 10,
    sort = ["createdAt", "desc"],
  }: Partial<GetMyReviewsReq>) => {
    return await customFetch.get<GetMyReviewsRes>(
      `${API_ENDPOINTS.REVIEW}/my?${qs.stringify({ page, size, sort })}`,
    );
  },
};

export default REVIEW_API;
