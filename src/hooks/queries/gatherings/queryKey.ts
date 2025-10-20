import { PaginationReq } from "@/api/types/common";
import { EGatheringType, GatheringType } from "@/lib/types/gatherings";

export const GATHERINGS_QUERY_KEYS = {
  all: () => ["gatherings"] as const,

  lists: () => [...GATHERINGS_QUERY_KEYS.all(), "list"] as const,
  list: (pagination: Partial<PaginationReq>) =>
    [...GATHERINGS_QUERY_KEYS.lists(), pagination] as const,
  regularList: (pagination: Partial<PaginationReq>) =>
    [...GATHERINGS_QUERY_KEYS.list(pagination), "regular"] as const,
  quickList: (pagination: Partial<PaginationReq>) =>
    [...GATHERINGS_QUERY_KEYS.list(pagination), "quick"] as const,

  details: () => [...GATHERINGS_QUERY_KEYS.all(), "detail"] as const,
  detail: (id: GatheringType["id"]) =>
    [...GATHERINGS_QUERY_KEYS.details(), id] as const,

  likes: () => [...GATHERINGS_QUERY_KEYS.all(), "like"] as const,
  like: ({ id }: { id: GatheringType["id"] }) => [
    ...GATHERINGS_QUERY_KEYS.likes(),
    id,
  ],

  bookmarkedGatherings: (
    type: EGatheringType,
    pagination: Partial<PaginationReq>,
  ) =>
    [...GATHERINGS_QUERY_KEYS.all(), "bookmarked", type, pagination] as const,

  myGatherings: (pagination: Partial<PaginationReq>) =>
    [...GATHERINGS_QUERY_KEYS.all(), "my", pagination] as const,

  joinedGatherings: (pagination: Partial<PaginationReq>) =>
    [...GATHERINGS_QUERY_KEYS.all(), "joined", pagination] as const,
};
