import {
  LocationType,
  ReviewDashboardType,
  ReviewType,
} from "@/lib/types/reviews";

import { PaginatedRes, PaginationReq, Response } from "./common";

export interface GetReviewsReq extends PaginationReq {
  location?: LocationType;
}
export type GetReviewsRes = Response<PaginatedRes<ReviewType>>;

export interface GetReviewDashboardReq {
  location: LocationType | undefined;
}
export type GetReviewDashboardRes = Response<ReviewDashboardType>;

export interface GetReviewsByGatheringReq extends PaginationReq {
  gatheringId: ReviewFilters["gatheringId"];
}
export type GetReviewsByGatheringRes = Response<PaginatedRes<ReviewType>>;

export interface ReviewFilters {
  location: LocationType;
  gatheringId: ReviewType["gatheringId"];
}

// GET /meong-road/reviews/my - 내 리뷰 목록 조회
export type GetMyReviewsReq = PaginationReq;
export type GetMyReviewsRes = Response<PaginatedRes<ReviewType>>;
