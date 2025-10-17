import { useQuery } from "@tanstack/react-query";

import REVIEW_API from "@/api/reviews";
import { GetMyReviewsReq } from "@/api/types/reviews";

import { reviewsQueryKeys } from "./queryKey";

export const useGetMyReviews = ({
  page = 0,
  size = 10,
  sort = ["createdAt", "desc"],
}: Partial<GetMyReviewsReq> = {}) => {
  return useQuery({
    queryKey: reviewsQueryKeys.myReviews({ page, size, sort }),
    queryFn: () => REVIEW_API.getMyReviews({ page, size, sort }),
    select: (data) => data.result,
  });
};
