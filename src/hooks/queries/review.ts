import { useQuery } from "@tanstack/react-query";

import REVIEW_API from "@/api/reviews";
import { GatheringType } from "@/lib/types/gathering";
import { GetReviewReq } from "@/lib/types/reviews";
import { PaginationReq } from "@/mocks/data/common";

export const REVIEW_QUERY_KEY = {
  REVIEWS: ["reviews"],
  REVIEWS_BY_GATHERING: ({
    gatheringId,
    paginationReq,
  }: {
    gatheringId: GatheringType["id"];
    paginationReq: PaginationReq;
  }) => ["reviews", gatheringId, paginationReq],
};

export const useGetReviewsByGathering = ({
  gatheringId,
  ...paginationReq
}: GetReviewReq) => {
  return useQuery({
    queryKey: REVIEW_QUERY_KEY.REVIEWS_BY_GATHERING({
      gatheringId,
      paginationReq,
    }),
    queryFn: () =>
      REVIEW_API.getReviewsByGathering({ gatheringId, ...paginationReq }),
  });
};
