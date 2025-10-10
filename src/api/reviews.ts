// src/api/reviews/getReviews.ts
import { GetReviewsReq, GetReviewsRes } from "@/lib/types/review";
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

  return await customFetch.get(`/meong-road/reviews?${params.toString()}`, {
    isPublic: true, // 공개 API - 인증 불필요
  });
}
