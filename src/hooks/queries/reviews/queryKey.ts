import { PaginationReq } from "@/api/types/common";
import { GetReviewDashboardReq } from "@/api/types/reviews";
import { LocationParamType } from "@/lib/types/reviews";

export const REVIEWS_QUERY_KEYS = {
  all: () => ["reviews"] as const,
  lists: () => [...REVIEWS_QUERY_KEYS.all(), "list"] as const,
  list: (
    pagination: Partial<PaginationReq>,
    filters: { location?: LocationParamType; gatheringId?: number },
  ) => [...REVIEWS_QUERY_KEYS.lists(), pagination, filters] as const,
  dashboards: () => [...REVIEWS_QUERY_KEYS.all(), "dashboard"] as const,
  dashboard: ({ location }: GetReviewDashboardReq) => [
    ...REVIEWS_QUERY_KEYS.dashboards(),
    location,
  ],
  myReviews: (pagination: Partial<PaginationReq>) =>
    [...REVIEWS_QUERY_KEYS.all(), "my", pagination] as const,
  userReview: (gatheringId: number) =>
    [...REVIEWS_QUERY_KEYS.all(), "user-review", gatheringId] as const,
  detail: (reviewId: number) =>
    [...REVIEWS_QUERY_KEYS.all(), "detail", reviewId] as const,
};
