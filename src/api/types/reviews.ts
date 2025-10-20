import {
  LocationParamType,
  ReviewDashboardType,
  ReviewType,
} from "@/lib/types/reviews";

import { PaginatedRes, PaginationReq, Response } from "./common";

export interface GetReviewsReq extends PaginationReq {
  location: LocationParamType;
}
export type GetReviewsRes = Response<PaginatedRes<ReviewType>>;

export interface GetReviewDashboardReq {
  location: LocationParamType;
}
export type GetReviewDashboardRes = Response<ReviewDashboardType>;

export interface GetReviewsByGatheringReq extends PaginationReq {
  gatheringId: ReviewFilters["gatheringId"];
}
export type GetReviewsByGatheringRes = Response<PaginatedRes<ReviewType>>;

export interface ReviewFilters {
  location: LocationParamType;
  gatheringId: ReviewType["gatheringId"];
}

// GET /meong-road/reviews/my - 내 리뷰 목록 조회
export type GetMyReviewsReq = PaginationReq;
export type GetMyReviewsRes = Response<PaginatedRes<ReviewType>>;
