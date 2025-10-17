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

export type GetGatheringDetailReq = Pick<GatheringType, "id">;
export type GetGatheringDetailRes = Response<GatheringType>;

export type GetIsLikedReq = Pick<GatheringType, "id">;
export type GetIsLikedRes = Response<{ isLiked: boolean }>;

export type LikeReq = Pick<GatheringType, "id">;
export type LikeRes = Response<string>;

export type CancelLikeReq = Pick<GatheringType, "id">;
export type CancelLikeRes = Response<string>;

// GET /meong-road/gatherings/my - 내가 만든 모임 목록 조회
export type GetMyGatheringsReq = PaginationReq;
export type GetMyGatheringsRes = Response<PaginatedRes<GatheringType>>;

// GET /meong-road/gatherings/joined - 참석한 모임 목록 조회
export type GetJoinedGatheringsReq = PaginationReq;
export type GetJoinedGatheringsRes = Response<
  PaginatedRes<GatheringType & { joinedAt: string }>
>;

export type GetMyBookmarkedGatheringsReq = BookmarkType;
export type GetMyBookmarkedGatheringsRes = Response<
  PaginatedRes<GatheringType>
>;
