import { PaginationOptions } from "@/api/types/common";
import { EGatheringType, GatheringType } from "@/lib/types/gatherings";

export const GATHERINGS_QUERY_KEYS = {
  all: () => ["gatherings"] as const,

  lists: () => [...GATHERINGS_QUERY_KEYS.all(), "list"] as const,
  list: (options: PaginationOptions) =>
    [...GATHERINGS_QUERY_KEYS.lists(), options] as const,
  regularList: (options: PaginationOptions) =>
    [...GATHERINGS_QUERY_KEYS.list(options), "regular"] as const,
  quickList: (options: PaginationOptions) =>
    [...GATHERINGS_QUERY_KEYS.list(options), "quick"] as const,

  details: () => [...GATHERINGS_QUERY_KEYS.all(), "detail"] as const,
  detail: (id: GatheringType["id"]) =>
    [...GATHERINGS_QUERY_KEYS.details(), id] as const,

  likes: () => [...GATHERINGS_QUERY_KEYS.all(), "like"] as const,
  like: ({ id }: { id: GatheringType["id"] }) => [
    ...GATHERINGS_QUERY_KEYS.likes(),
    id,
  ],

  bookmarkedGatherings: (type: EGatheringType, options: PaginationOptions) =>
    [...GATHERINGS_QUERY_KEYS.all(), "bookmarked", type, options] as const,

  myGatherings: (options: PaginationOptions) =>
    [...GATHERINGS_QUERY_KEYS.all(), "my", options] as const,

  joinedGatherings: (options: PaginationOptions) =>
    [...GATHERINGS_QUERY_KEYS.all(), "joined", options] as const,

  participants: (
    { id }: { id: GatheringType["id"] },
    options: PaginationOptions,
  ) => [...GATHERINGS_QUERY_KEYS.all(), "participants", id, options] as const,
  participants4: ({ id }: { id: GatheringType["id"] }) =>
    [...GATHERINGS_QUERY_KEYS.all(), "participants", id, "last4"] as const,
  participating: ({ id }: { id: GatheringType["id"] }) =>
    [...GATHERINGS_QUERY_KEYS.all(), "participating", id] as const,
};
