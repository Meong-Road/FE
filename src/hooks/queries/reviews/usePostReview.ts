import { useMutation, useQueryClient } from "@tanstack/react-query";

import REVIEW_API from "@/api/reviews";
import { PostReviewReq } from "@/api/types/reviews";

import { QUERY_KEYS } from "../queryKey";

export function usePostReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PostReviewReq) => REVIEW_API.postReview(data),
    onSuccess: () => {
      // 모든 리뷰 관련 쿼리 무효화
      // (myReviews, reviewableGatherings, userReview, list 등 모두 포함)
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.reviews.all(),
      });
    },
  });
}
