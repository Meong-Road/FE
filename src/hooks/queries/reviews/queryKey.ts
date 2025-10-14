import {
  GetReviewDashboardReq,
  GetReviewsByGatheringReq,
  GetReviewsReq,
} from "@/api/types/reviews";

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
  REVIEW_DASHBOARD: ({ location }: GetReviewDashboardReq) => [
    "reviews",
    "dashboard",
    location,
  ],
};
