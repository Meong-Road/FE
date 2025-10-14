import { useQuery } from "@tanstack/react-query";

import REVIEW_API from "@/api/reviews";
import { GetReviewDashboardReq } from "@/api/types/reviews";

import { REVIEW_QUERY_KEY } from "./queryKey";

export function useGetReviewDashboard({
  location = "서울 전체",
}: GetReviewDashboardReq) {
  return useQuery({
    queryKey: REVIEW_QUERY_KEY.REVIEW_DASHBOARD({ location }),
    queryFn: () => REVIEW_API.getReviewDashboard({ location }),
  });
}
