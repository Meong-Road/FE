import { useQuery } from "@tanstack/react-query";

import REVIEW_API from "@/api/reviews";
import { PaginationReq } from "@/api/types/common";
import { GetReviewsByGatheringReq } from "@/api/types/reviews";

import { REVIEW_QUERY_KEY } from "./queryKey";

export function useGetReviewsByGathering({
  size = 10,
  page = 1,
  sort = ["createdAt"],
  ...params
}: Omit<GetReviewsByGatheringReq, keyof PaginationReq> &
  Partial<PaginationReq>) {
  return useQuery({
    queryKey: REVIEW_QUERY_KEY.REVIEWS_BY_GATHERING({
      size,
      page,
      sort,
      ...params,
    }),
    queryFn: () =>
      REVIEW_API.getReviewsByGathering({ size, page, sort, ...params }),
  });
}
