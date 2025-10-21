import { useQuery } from "@tanstack/react-query";

import REVIEW_API from "@/api/reviews";
import { GetReviewsReq } from "@/api/types/reviews";

import { QUERY_KEYS } from "../queryKey";

export function useGetReviews({
  location,
  page = 0,
  size = 10,
  sort = ["createdAt", "desc"],
}: GetReviewsReq) {
  return useQuery({
    queryKey: QUERY_KEYS.reviews.list({ page, size, sort }, { location }),
    queryFn: () => REVIEW_API.getReviews({ location, page, size, sort }),
  });
}
