import { useQuery } from "@tanstack/react-query";

import REVIEW_API from "@/api/reviews";
import { GetReviewsByGatheringReq } from "@/lib/types/reviews";
import { PaginationReq } from "@/mocks/data/common";

export const REVIEW_QUERY_KEY = {
  REVIEWS: ["reviews"],
  REVIEWS_BY_GATHERING: ({
    gatheringId,
    paginationReq,
  }: {
    gatheringId: GetReviewsByGatheringReq["gatheringId"];
    paginationReq: PaginationReq;
  }) => ["reviews", gatheringId, paginationReq],
};

export const useGetReviewsByGathering = ({
  gatheringId,
  ...paginationReq
}: GetReviewsByGatheringReq) => {
  return useQuery({
    queryKey: REVIEW_QUERY_KEY.REVIEWS_BY_GATHERING({
      gatheringId,
      paginationReq,
    }),
    queryFn: () =>
      REVIEW_API.getReviewsByGathering({ gatheringId, ...paginationReq }),
  });
};
