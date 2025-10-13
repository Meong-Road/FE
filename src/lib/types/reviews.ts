import { PaginationReq, Response } from "@/mocks/data/common";

import { GatheringType } from "./gathering";

export interface ReviewType {
  id: number;
  userId: number;
  gatheringId: number;
  score: number;
  comment: string;
  createdAt: string;
  gathering: GatheringType;
  user: UserType;
}

// ! TODO 임시 유저 타입
interface UserType {
  id: number;
  email: string;
  name: string;
  nickName: string;
  image: string;
  isPetInfoSubmitted: boolean;
  createdAt: string;
  updatedAt: string;
}

// ! PaginatedRes
export interface PaginatedRes<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

export interface GetReviewsByGatheringReq extends PaginationReq {
  gatheringId: ReviewType["gatheringId"];
}
export type GetReviewsByGatheringRes = Response<PaginatedRes<ReviewType>>;
