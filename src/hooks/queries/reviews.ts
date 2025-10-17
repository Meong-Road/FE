"use client";

import { useQuery } from "@tanstack/react-query";

import REVIEW_API from "@/api/reviews";
import { PaginationReq } from "@/api/types/common";
import {
  GetReviewDashboardReq,
  GetReviewsByGatheringReq,
  GetReviewsReq,
} from "@/api/types/reviews";

import { queryKeys } from "./queryKey";

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
}: GetReviewsReq) => {
  return useQuery({
    queryKey: queryKeys.reviews.list({ page, size, sort }, { location }),
    queryFn: () =>
      REVIEW_API.getReviews({
        location,
        page,
        size,
        sort,
      }),
  });
};

export const useGetReviewDashboard = ({
  location = "서울 전체",
}: GetReviewDashboardReq) => {
  return useQuery({
    queryKey: queryKeys.reviews.dashboard({ location }),
    queryFn: () => REVIEW_API.getReviewDashboard({ location }),
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
    queryKey: queryKeys.reviews.list(
      { page, size, sort },
      { gatheringId: params.gatheringId },
    ),
    queryFn: () =>
      REVIEW_API.getReviewsByGathering({ size, page, sort, ...params }),
  });
};
