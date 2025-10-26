import { useMutation, useQueryClient } from "@tanstack/react-query";

import REVIEW_API from "@/api/reviews";
import { PutReviewReq } from "@/api/types/reviews";

import { QUERY_KEYS } from "../queryKey";

export function usePutReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PutReviewReq) => REVIEW_API.putReview(data),
    onSuccess: () => {
      // 모든 리뷰 관련 쿼리 무효화
      // (myReviews, list, detail 등 모두 포함)
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.reviews.all(),
      });
    },
  });
}
