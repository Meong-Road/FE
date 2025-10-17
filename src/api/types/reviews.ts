import {
  LocationType,
  ReviewDashboardType,
  ReviewType,
} from "@/lib/types/reviews";

import { PaginatedRes, PaginationReq, Response } from "./common";

export interface GetReviewsReq extends PaginationReq {
  location: ReviewFilters["location"];
}
export type GetReviewsRes = Response<PaginatedRes<ReviewType>>;

export interface GetReviewDashboardReq {
  location: string;
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
