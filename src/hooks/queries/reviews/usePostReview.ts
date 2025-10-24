import { useMutation, useQueryClient } from "@tanstack/react-query";

import REVIEW_API from "@/api/reviews";
import { PostReviewReq } from "@/api/types/reviews";

import { REVIEW_CHECK_QUERY_KEY } from "./useGetReviewCheck";

export function usePostReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PostReviewReq) => REVIEW_API.postReview(data),
    onSuccess: (_, variables) => {
      // 리뷰 작성 후 작성 여부 캐시 무효화
      queryClient.invalidateQueries({
        queryKey: [REVIEW_CHECK_QUERY_KEY, variables.gatheringId],
      });
      // 내 리뷰 목록 무효화
      queryClient.invalidateQueries({ queryKey: ["myReviews"] });
    },
  });
}
