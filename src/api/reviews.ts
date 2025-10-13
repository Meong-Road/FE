import qs from "qs";

import {
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
    const params = new URLSearchParams({
      location,
      page: page.toString(),
      size: size.toString(),
      sort: sort.join(","),
    });

    return await customFetch.get(
      `${API_ENDPOINTS.REVIEW}?${params.toString()}`,
      {
        isPublic: true, // 공개 API - 인증 불필요
      },
    );
  },
  getReviewsByGathering: async ({
    gatheringId,
    ...params
  }: GetReviewsByGatheringReq): Promise<GetReviewsByGatheringRes> => {
    const response = await fetch(
      `${API_ENDPOINTS.REVIEW}/gatherings/${gatheringId}?${qs.stringify(params)}`,
    );
    return response.json();
  },
};

export default REVIEW_API;
