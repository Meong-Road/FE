import { useQuery } from "@tanstack/react-query";

import REVIEW_API from "@/api/reviews";
import { GetReviewDashboardReq } from "@/api/types/reviews";

import { QUERY_KEYS } from "../queryKey";

export function useGetReviewDashboard({ location }: GetReviewDashboardReq) {
  return useQuery({
    queryKey: QUERY_KEYS.reviews.dashboard({ location }),
    queryFn: () => REVIEW_API.getReviewDashboard({ location }),
  });
}
