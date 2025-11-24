import {
  BookmarkType,
  CreateGatheringType,
  GatheringImageResult,
  GatheringType,
  ParticipantsType,
  QuickGatheringType,
  RegularGatheringType,
} from "@/lib/types/gatherings";
import { DistrictParam } from "@/lib/types/reviews";

import { PaginatedRes, PaginationReq, Response } from "./common";

export interface CommonGatheringFilters {
  location?: DistrictParam;
  hostId?: number | null;
  isClosed?: boolean | null;
  isPetRequired?: boolean | null;
}

export interface RegularGatheringFilters extends CommonGatheringFilters {
  dayOfWeek?: string[] | null;
}
export interface QuickGatheringFilters extends CommonGatheringFilters {
  startDate?: string | null;
  endDate?: string | null;
}

export type GetRegularGatheringsReq = PaginationReq &
  Partial<RegularGatheringFilters>;
export type GetRegularGatheringsRes = Response<
  PaginatedRes<RegularGatheringType>
>;

export type GetQuickGatheringsReq = PaginationReq &
  Partial<QuickGatheringFilters>;
export type GetQuickGatheringsRes = Response<PaginatedRes<QuickGatheringType>>;

export type GetGatheringReq = Pick<GatheringType, "id">;
export type GetGatheringRes = Response<GatheringType>;

export type GetIsLikedReq = Pick<GatheringType, "id">;
export type GetIsLikedRes = Response<{ isLiked: boolean }>;

export type PostLikeReq = Pick<GatheringType, "id">;
export type PostLikeRes = Response<string>;

export type DeleteLikeReq = Pick<GatheringType, "id">;
export type DeleteLikeRes = Response<string>;

export type GatheringStatus =
  | "RECRUITING"
  | "CONFIRMED"
  | "COMPLETED"
  | "CANCELED";

// GET /meong-road/gatherings/my - 내가 만든 모임 목록 조회
export type GetMyGatheringsReq = PaginationReq & { status?: GatheringStatus };
export type GetMyGatheringsRes = Response<PaginatedRes<GatheringType>>;

// GET /meong-road/gatherings/joined - 참석한 모임 목록 조회
export type GetJoinedGatheringsReq = PaginationReq & {
  status?: GatheringStatus;
};
export type GetJoinedGatheringsRes = Response<
  PaginatedRes<GatheringType & { joinedAt: string }>
>;

export type GetIsParticipatingReq = Pick<GatheringType, "id">;
export type GetIsParticipatingRes = Response<{ isParticipated: boolean }>;

// POST /meong-road/gatherings/{gatheringId}/join - 모임 참여
export type PostJoinGatheringReq = Pick<GatheringType, "id">;
export type PostJoinGatheringRes = Response<string>;

// DELETE /meong-road/gatherings/{gatheringId}/leave - 모임 참여 취소
export type DeleteJoinGatheringReq = Pick<GatheringType, "id">;
export type DeleteJoinGatheringRes = Response<string>;

// Delete /meong-road/gatherings/{gatheringId} - 모임 취소
export type DeleteGatheringReq = Pick<GatheringType, "id">;
export type DeleteGatheringRes = Response<string>;

export type GetMyBookmarkedGatheringsReq = BookmarkType;
export type GetMyBookmarkedGatheringsRes = Response<
  PaginatedRes<GatheringType>
>;

export type GetParticipantsReq = Pick<GatheringType, "id"> & PaginationReq;
export type GetParticipantsRes = Response<PaginatedRes<ParticipantsType>>;

export type PostGatheringReq = CreateGatheringType;
export type PostGatheringRes = Response<GatheringType>;

export type GatheringImageUploadReq = { file: File };
export type GatheringImageUploadRes = Response<GatheringImageResult>;
