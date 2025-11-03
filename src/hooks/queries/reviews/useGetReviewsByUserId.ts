import { useQuery } from "@tanstack/react-query";

import REVIEW_API from "@/api/reviews";
import { GetReviewsByUserIdReq } from "@/api/types/reviews";

import { QUERY_KEYS } from "../queryKey";

export const useGetReviewsByUserId = ({
  userId,
  page = 0,
  size = 10,
  sort = ["createdAt", "desc"],
}: GetReviewsByUserIdReq) => {
  return useQuery({
    queryKey: QUERY_KEYS.reviews.byUserId(userId, { page, size, sort }),
    queryFn: () => REVIEW_API.getReviewsByUserId({ userId, page, size, sort }),
    select: (data) => data.result,
    enabled: !!userId,
  });
};
