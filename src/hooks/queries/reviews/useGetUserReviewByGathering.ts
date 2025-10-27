import { useQuery } from "@tanstack/react-query";

import REVIEW_API from "@/api/reviews";

import { REVIEWS_QUERY_KEYS } from "./queryKey";

interface UseGetUserReviewByGatheringOptions {
  enabled?: boolean;
}

export function useGetUserReviewByGathering(
  gatheringId: number,
  options?: UseGetUserReviewByGatheringOptions,
) {
  return useQuery({
    queryKey: REVIEWS_QUERY_KEYS.userReview(gatheringId),
    queryFn: () =>
      REVIEW_API.getUserReviewByGathering({
        gatheringId,
      }),
    select: (data) => data.result,
    enabled: options?.enabled !== false,
  });
}
