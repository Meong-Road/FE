// src/api/reviews/getReviews.ts
import { API_ENDPOINTS } from "@/lib/constants/endpoints";
import { GetReviewsReq, GetReviewsRes } from "@/lib/types/review";
import {
  GetReviewsByGatheringReq,
  GetReviewsByGatheringRes,
} from "@/lib/types/reviews";
import { Response } from "@/mocks/data/common";

import { customFetch } from "./customFetch"; // 네가 만든 fetch 래퍼가 있다면 이걸 사용

export async function getReviews({
  location,
  page = 0,
  size = 10,
  sort = "createdAt,desc",
}: GetReviewsReq): Promise<Response<GetReviewsRes>> {
  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
    sort,
  });

  if (location) {
    params.append("location", location);
  }

  return await customFetch.get(`${API_ENDPOINTS.REVIEW}?${params.toString()}`, {
    isPublic: true, // 공개 API - 인증 불필요
  });
}

const REVIEW_API = {
  getReviewsByGathering: async ({
    gatheringId,
    page,
    size,
    sort,
  }: GetReviewsByGatheringReq): Promise<GetReviewsByGatheringRes> => {
    const response = await fetch(
      `${API_ENDPOINTS.REVIEW}/gatherings/${gatheringId}`,
    );
    return response.json();
  },
};

export default REVIEW_API;
