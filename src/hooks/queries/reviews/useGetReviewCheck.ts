import { useQuery } from "@tanstack/react-query";

import REVIEW_API from "@/api/reviews";

export const REVIEW_CHECK_QUERY_KEY = "reviewCheck";

export function useGetReviewCheck(
  gatheringId: number,
  options?: { enabled?: boolean },
) {
  return useQuery({
    queryKey: [REVIEW_CHECK_QUERY_KEY, gatheringId],
    queryFn: async () => {
      const response = await REVIEW_API.checkReview({ gatheringId });
      return response.result;
    },
    enabled: options?.enabled !== false,
  });
}
