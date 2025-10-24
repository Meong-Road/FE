import { useMutation, useQueryClient } from "@tanstack/react-query";

import REVIEW_API from "@/api/reviews";
import { PostReviewReq } from "@/api/types/reviews";
import { DEFAULT_LIST_OPTIONS } from "@/lib/constants/option";

import { QUERY_KEYS } from "../queryKey";

export function usePostReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PostReviewReq) => REVIEW_API.postReview(data),
    onSuccess: (_, variables) => {
      // 리뷰 작성 후 작성 여부 캐시 무효화
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.reviews.userReview(variables.gatheringId)],
      });
      // 내 리뷰 목록 무효화
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.reviews.myReviews({}),
      });

      // 특정 모임 리뷰 작성 여부조회 캐시 무효화
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.reviews.userReview(variables.gatheringId ?? 0),
      });
    },
  });
}
