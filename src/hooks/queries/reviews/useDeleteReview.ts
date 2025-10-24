import { useMutation, useQueryClient } from "@tanstack/react-query";

import REVIEW_API from "@/api/reviews";
import { DeleteReviewReq } from "@/api/types/reviews";

export function useDeleteReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: DeleteReviewReq) => REVIEW_API.deleteReview(data),
    onSuccess: () => {
      // 내 리뷰 목록 무효화
      queryClient.invalidateQueries({ queryKey: ["myReviews"] });
      // 리뷰 목록 무효화
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
  });
}
