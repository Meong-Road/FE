"use client";

import { useQuery } from "@tanstack/react-query";

import { getReviews } from "@/api/reviews";
import { GetReviewsReq, GetReviewsRes } from "@/lib/types/review";
import { Response } from "@/mocks/data/common";

interface UseGetReviewsOptions extends GetReviewsReq {
  initialData?: Response<GetReviewsRes>;
}

export const useGetReviews = ({
  location = null,
  page = 0,
  size = 10,
  sort = "createdAt,desc",
  initialData,
}: UseGetReviewsOptions) => {
  return useQuery({
    queryKey: ["reviews", location, page, size, sort],
    queryFn: () =>
      getReviews({
        location,
        page,
        size,
        sort,
      }),
    initialData,
    staleTime: 1000 * 60, // 1분간 데이터를 fresh로 유지
  });
};
