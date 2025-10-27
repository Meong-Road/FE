import { PaginationOptions } from "@/api/types/common";
import { EGatheringType, GatheringType } from "@/lib/types/gatherings";

export enum EType {
  REGULAR = "regular",
  QUICK = "quick",
  MY = "my",
  JOINED = "joined",
  BOOKMARKED = "bookmarked",
  PARTICIPANTS = "participants",
  PARTICIPATION = "participation",
}

export const GATHERINGS_QUERY_KEYS = {
  all: () => ["gatherings"] as const,
  lists: () => [...GATHERINGS_QUERY_KEYS.all(), "list"] as const,
  list: (listType: EType, options: PaginationOptions) =>
    [...GATHERINGS_QUERY_KEYS.lists(), listType, options] as const,
  regularList: (options: PaginationOptions) =>
    [...GATHERINGS_QUERY_KEYS.list(EType.REGULAR, options)] as const,
  quickList: (options: PaginationOptions) =>
    [...GATHERINGS_QUERY_KEYS.list(EType.QUICK, options)] as const,
  myGatheringList: (options: PaginationOptions) =>
    [...GATHERINGS_QUERY_KEYS.list(EType.MY, options)] as const,
  joinedGatheringList: (options: PaginationOptions) =>
    [...GATHERINGS_QUERY_KEYS.list(EType.JOINED, options)] as const,
  bookmarkedList: (type: EGatheringType, options: PaginationOptions) =>
    [...GATHERINGS_QUERY_KEYS.list(EType.BOOKMARKED, options), type] as const,
  // 모임 참여자
  participantList: (
    { id }: { id: GatheringType["id"] },
    options: PaginationOptions,
  ) =>
    [...GATHERINGS_QUERY_KEYS.list(EType.PARTICIPANTS, options), id] as const,

  // 모임 상세
  detail: (id: GatheringType["id"]) =>
    [...GATHERINGS_QUERY_KEYS.all(), id] as const,

  // 모임 즐겨찾기 여부
  bookmark: ({ id }: { id: GatheringType["id"] }) => [
    ...GATHERINGS_QUERY_KEYS.all(),
    EType.BOOKMARKED,
    id,
  ],
  // 모임 참여 여부
  participation: ({ id }: { id: GatheringType["id"] }) =>
    [...GATHERINGS_QUERY_KEYS.all(), EType.PARTICIPATION, id] as const,
};
