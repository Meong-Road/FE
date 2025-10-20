import {
  BookmarkType,
  GatheringType,
  QuickGatheringType,
  RegularGatheringType,
} from "@/lib/types/gatherings";

import { PaginatedRes, PaginationReq, Response } from "./common";

export type GetRegularGatheringsReq = PaginationReq;
export type GetRegularGatheringsRes = Response<
  PaginatedRes<RegularGatheringType>
>;

export type GetQuickGatheringsReq = PaginationReq;
export type GetQuickGatheringsRes = Response<PaginatedRes<QuickGatheringType>>;

export type GetGatheringReq = Pick<GatheringType, "id">;
export type GetGatheringRes = Response<GatheringType>;

export type GetIsLikedReq = Pick<GatheringType, "id">;
export type GetIsLikedRes = Response<{ isLiked: boolean }>;

export type PostLikeReq = Pick<GatheringType, "id">;
export type PostLikeRes = Response<string>;

export type DeleteLikeReq = Pick<GatheringType, "id">;
export type DeleteLikeRes = Response<string>;

// GET /meong-road/gatherings/my - 내가 만든 모임 목록 조회
export type GetMyGatheringsReq = PaginationReq;
export type GetMyGatheringsRes = Response<PaginatedRes<GatheringType>>;

// GET /meong-road/gatherings/joined - 참석한 모임 목록 조회
export type GetJoinedGatheringsReq = PaginationReq;
export type GetJoinedGatheringsRes = Response<
  PaginatedRes<GatheringType & { joinedAt: string }>
>;

// POST /meong-road/gatherings/{gatheringId}/join - 모임 참여
export type PostJoinGatheringReq = Pick<GatheringType, "id">;
export type PostJoinGatheringRes = Response<string>;

// DELETE /meong-road/gatherings/{gatheringId}/leave - 모임 참여 취소
export type DeleteJoinGatheringReq = Pick<GatheringType, "id">;
export type DeleteJoinGatheringRes = Response<string>;

export type GetMyBookmarkedGatheringsReq = BookmarkType;
export type GetMyBookmarkedGatheringsRes = Response<
  PaginatedRes<GatheringType>
>;
