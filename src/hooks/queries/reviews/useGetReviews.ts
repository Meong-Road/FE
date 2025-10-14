import { useQuery } from "@tanstack/react-query";

import REVIEW_API from "@/api/reviews";
import { GetReviewsReq, GetReviewsRes } from "@/api/types/reviews";

import { REVIEW_QUERY_KEY } from "./queryKey";

interface UseGetReviewsOptions extends Partial<GetReviewsReq> {
  initialData?: GetReviewsRes;
}

export function useGetReviews({
  location = "서울 전체",
  page = 0,
  size = 10,
  sort = ["createdAt", "desc"],
  initialData,
}: UseGetReviewsOptions) {
  return useQuery({
    queryKey: REVIEW_QUERY_KEY.REVIEWS({ location, page, size, sort }),
    queryFn: () =>
      REVIEW_API.getReviews({
        location,
        page,
        size,
        sort,
      }),
    initialData,
  });
}
