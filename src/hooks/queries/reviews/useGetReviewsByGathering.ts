import { useQuery } from "@tanstack/react-query";

import REVIEW_API from "@/api/reviews";
import { PaginationReq } from "@/api/types/common";
import { GetReviewsByGatheringReq } from "@/api/types/reviews";

import { QUERY_KEYS } from "../queryKey";

export function useGetReviewsByGathering({
  size = 10,
  page = 0,
  sort = ["createdAt", "desc"],
  ...params
}: Omit<GetReviewsByGatheringReq, keyof PaginationReq> &
  Partial<PaginationReq>) {
  return useQuery({
    queryKey: QUERY_KEYS.reviews.list(
      {
        size,
        page,
        sort,
      },
      { gatheringId: params.gatheringId },
    ),
    queryFn: () =>
      REVIEW_API.getReviewsByGathering({ size, page, sort, ...params }),
  });
}
