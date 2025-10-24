import { useMutation, useQueryClient } from "@tanstack/react-query";

import REVIEW_API from "@/api/reviews";
import { PutReviewReq } from "@/api/types/reviews";

export function usePutReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PutReviewReq) => REVIEW_API.putReview(data),
    onSuccess: () => {
      // 내 리뷰 목록 무효화
      queryClient.invalidateQueries({ queryKey: ["myReviews"] });
      // 리뷰 목록 무효화
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
  });
}
