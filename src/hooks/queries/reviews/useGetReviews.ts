import { useQuery } from "@tanstack/react-query";

import REVIEW_API from "@/api/reviews";
import { GetReviewsReq } from "@/api/types/reviews";

import { queryKeys } from "../queryKey";

export function useGetReviews({
  location = null,
  page = 0,
  size = 10,
  sort = ["createdAt", "desc"],
}: GetReviewsReq) {
  return useQuery({
    queryKey: queryKeys.reviews.list({ page, size, sort }, { location }),
    queryFn: () => REVIEW_API.getReviews({ location, page, size, sort }),
  });
}
