import { useQuery } from "@tanstack/react-query";

import REVIEW_API from "@/api/reviews";
import { GetReviewDashboardReq } from "@/api/types/reviews";

import { queryKeys } from "../queryKey";

export function useGetReviewDashboard({
  location = "서울 전체",
}: GetReviewDashboardReq) {
  return useQuery({
    queryKey: queryKeys.reviews.dashboard({ location }),
    queryFn: () => REVIEW_API.getReviewDashboard({ location }),
  });
}
