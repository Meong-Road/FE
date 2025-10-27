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

// GET /meong-road/reviews/{reviewId} - 리뷰 상세 조회
export interface GetReviewReq {
  reviewId: number;
}
export type GetReviewRes = Response<ReviewType>;

// GET /meong-road/reviews/check/{gatheringId} - 리뷰 작성 여부 확인
export interface GetReviewCheckReq {
  gatheringId: number;
}
export type GetReviewCheckRes = Response<boolean>;

// POST /meong-road/reviews - 리뷰 생성
export interface PostReviewReq {
  gatheringId: number;
  score: ReviewType["score"];
  comment: string;
}
export type PostReviewRes = Response<ReviewType>;

// PUT /meong-road/reviews/{reviewId} - 리뷰 수정
export interface PutReviewReq {
  reviewId: number;
  data: {
    score: ReviewType["score"];
    comment: string;
  };
}
export type PutReviewRes = Response<ReviewType>;

// DELETE /meong-road/reviews/{reviewId} - 리뷰 삭제
export interface DeleteReviewReq {
  reviewId: number;
}
export type DeleteReviewRes = Response<void>;
// GET /meong-road/reviews/user-review/{gatheringId} - 사용자의 모임 리뷰 조회
export interface GetUserReviewByGatheringReq {
  gatheringId: number;
}
export type GetUserReviewByGatheringRes = Response<ReviewType | null>;

// GET /meong-road/reviews/reviewable-gatherings - 리뷰 작성 가능한 모임 목록 조회
export type GetReviewableGatheringsReq = PaginationReq;
export type GetReviewableGatheringsRes = Response<
  PaginatedRes<ReviewType["gathering"] & { joinedAt: string }>
>;
