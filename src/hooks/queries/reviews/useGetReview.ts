import { useQuery } from "@tanstack/react-query";

import REVIEW_API from "@/api/reviews";

import { REVIEWS_QUERY_KEYS } from "./queryKey";

/**
 * 개별 리뷰 상세 조회
 * @param reviewId - 리뷰 ID
 * @param options - React Query options
 */
export function useGetReview(
  reviewId: number,
  options?: { enabled?: boolean },
) {
  return useQuery({
    queryKey: REVIEWS_QUERY_KEYS.detail(reviewId),
    queryFn: () => REVIEW_API.getReview({ reviewId }),
    select: (response) => response.result,
    enabled: options?.enabled ?? true,
  });
}
