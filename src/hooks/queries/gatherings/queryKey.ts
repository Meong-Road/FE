import { PaginationOptions } from "@/api/types/common";
import { EGatheringType, GatheringType } from "@/lib/types/gatherings";

export const GATHERINGS_QUERY_KEYS = {
  all: () => ["gatherings"] as const,
  list: (options: PaginationOptions) =>
    [...GATHERINGS_QUERY_KEYS.all(), "list", options] as const,
  regularList: (options: PaginationOptions) =>
    [...GATHERINGS_QUERY_KEYS.list(options), "regular"] as const,
  quickList: (options: PaginationOptions) =>
    [...GATHERINGS_QUERY_KEYS.list(options), "quick"] as const,
  myGatheringList: (options: PaginationOptions) =>
    [...GATHERINGS_QUERY_KEYS.list(options), "my"] as const,
  joinedGatheringList: (options: PaginationOptions) =>
    [...GATHERINGS_QUERY_KEYS.list(options), "joined"] as const,
  bookmarkedList: (type: EGatheringType, options: PaginationOptions) =>
    [...GATHERINGS_QUERY_KEYS.list(options), "bookmarked", type] as const,

  // 모임 상세
  detail: (id: GatheringType["id"]) =>
    [...GATHERINGS_QUERY_KEYS.all(), id] as const,

  // 모임 즐겨찾기
  bookmark: ({ id }: { id: GatheringType["id"] }) => [
    ...GATHERINGS_QUERY_KEYS.all(),
    "bookmarked",
    id,
  ],

  // 모임 참여 여부
  participation: ({ id }: { id: GatheringType["id"] }) =>
    [...GATHERINGS_QUERY_KEYS.all(), "participation", id] as const,

  // 모임 참여자
  participantList: (
    { id }: { id: GatheringType["id"] },
    options: PaginationOptions,
  ) =>
    [...GATHERINGS_QUERY_KEYS.all(), "participants", id, { options }] as const,
};
