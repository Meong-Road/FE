"use client";

import { useQuery } from "@tanstack/react-query";

import REVIEW_API from "@/api/reviews";
import { PaginationReq } from "@/api/types/common";
import {
  GetReviewsByGatheringReq,
  GetReviewsReq,
  GetReviewsRes,
} from "@/api/types/reviews";

interface UseGetReviewsOptions extends Partial<GetReviewsReq> {
  initialData?: GetReviewsRes;
}

export const REVIEW_QUERY_KEY = {
  REVIEWS: ({ location, page, size, sort }: GetReviewsReq) => [
    "reviews",
    location,
    page,
    size,
    sort,
  ],
  REVIEWS_BY_GATHERING: ({
    gatheringId,
    ...params
  }: GetReviewsByGatheringReq) => ["reviews", gatheringId, params],
};

export const useGetReviews = ({
  location = "서울 전체",
  page = 0,
  size = 10,
  sort = ["createdAt", "desc"],
  initialData,
}: UseGetReviewsOptions) => {
  return useQuery({
    queryKey: REVIEW_QUERY_KEY.REVIEWS({ location, page, size, sort }),
    queryFn: () =>
      REVIEW_API.getReviews({
        location,
        page,
        size,
        sort,
      }),
    initialData,
  });
};

export const useGetReviewsByGathering = ({
  size = 10,
  page = 1,
  sort = ["createdAt"],
  ...params
}: Omit<GetReviewsByGatheringReq, keyof PaginationReq> &
  Partial<PaginationReq>) => {
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
};
