import {
  GatheringType,
  QuickGatheringType,
  RegularGatheringType,
} from "@/lib/types/gatherings";

import { PaginatedRes, PaginationReq, Response } from "./common";

export type GetRegularGatheringsReq = PaginationReq;
export type GetRegularGatheringsRes = PaginatedRes<RegularGatheringType>;

export type GetQuickGatheringsReq = PaginationReq;
export type GetQuickGatheringsRes = PaginatedRes<QuickGatheringType>;

export type GetGatheringDetailReq = Pick<GatheringType, "id">;
export type GetGatheringDetailRes = Response<GatheringType>;

export type GetIsLikedReq = Pick<GatheringType, "id">;
export type GetIsLikedRes = Response<{ isLiked: boolean }>;

export type LikeReq = Pick<GatheringType, "id">;
export type LikeRes = Response<string>;

export type CancelLikeReq = Pick<GatheringType, "id">;
export type CancelLikeRes = Response<string>;
