import { useMutation, useQueryClient } from "@tanstack/react-query";

import REVIEW_API from "@/api/reviews";
import { DeleteReviewReq } from "@/api/types/reviews";

import { QUERY_KEYS } from "../queryKey";

export function useDeleteReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: DeleteReviewReq) => REVIEW_API.deleteReview(data),
    onSuccess: () => {
      // 모든 리뷰 관련 쿼리 무효화
      // (myReviews, reviewableGatherings, userReview, list 등 모두 포함)
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.reviews.all(),
      });
    },
  });
}
