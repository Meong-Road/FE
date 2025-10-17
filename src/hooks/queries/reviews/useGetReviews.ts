import { useQuery } from "@tanstack/react-query";

import REVIEW_API from "@/api/reviews";
import { GetReviewsReq, GetReviewsRes } from "@/api/types/reviews";

import { queryKeys } from "../queryKey";

interface UseGetReviewsOptions extends Partial<GetReviewsReq> {
  initialData?: GetReviewsRes;
}

export function useGetReviews({
  location = "서울 전체",
  page = 0,
  size = 10,
  sort = ["createdAt", "desc"],
}: UseGetReviewsOptions) {
  return useQuery({
    queryKey: queryKeys.reviews.list(
      {
        page,
        size,
        sort,
      },
      { location },
    ),
    queryFn: () =>
      REVIEW_API.getReviews({
        location,
        page,
        size,
        sort,
      }),
  });
}
