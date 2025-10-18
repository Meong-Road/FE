import { PaginationReq } from "@/api/types/common";
import { GetReviewDashboardReq } from "@/api/types/reviews";
import { LocationType } from "@/lib/types/reviews";

export const reviewsQueryKeys = {
  all: () => ["reviews"] as const,
  lists: () => [...reviewsQueryKeys.all(), "list"] as const,
  list: (
    pagination: Partial<PaginationReq>,
    filters: { location?: LocationType; gatheringId?: number },
  ) => [...reviewsQueryKeys.lists(), pagination, filters] as const,
  dashboards: () => [...reviewsQueryKeys.all(), "dashboard"] as const,
  dashboard: ({ location }: GetReviewDashboardReq) => [
    ...reviewsQueryKeys.dashboards(),
    location,
  ],
  myReviews: (pagination: Partial<PaginationReq>) =>
    [...reviewsQueryKeys.all(), "my", pagination] as const,
};
