import { ReviewDashboardType, ReviewType } from "@/lib/types/review";

import { PaginatedRes, PaginationReq, Response } from "./common";

export interface GetReviewsReq extends PaginationReq {
  location: string;
}
export type GetReviewsRes = Response<PaginatedRes<ReviewType>>;

export interface GetReviewDashboardReq {
  location: string;
}
export type GetReviewDashboardRes = Response<ReviewDashboardType>;

export type GetReviewsByGatheringReq = PaginationReq &
  Pick<ReviewType, "gatheringId">;
export type GetReviewsByGatheringRes = Response<PaginatedRes<ReviewType>>;
