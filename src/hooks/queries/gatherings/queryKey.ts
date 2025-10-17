import { PaginationReq } from "@/api/types/common";
import { GatheringType } from "@/lib/types/gatherings";

export const gatheringsQueryKeys = {
  all: () => ["gatherings"] as const,
  lists: () => [...gatheringsQueryKeys.all(), "list"] as const,
  list: (pagination: Partial<PaginationReq>) =>
    [...gatheringsQueryKeys.lists(), pagination] as const,
  regularList: (pagination: Partial<PaginationReq>) =>
    [...gatheringsQueryKeys.list(pagination), "regular"] as const,
  quickList: (pagination: Partial<PaginationReq>) =>
    [...gatheringsQueryKeys.list(pagination), "quick"] as const,
  details: () => [...gatheringsQueryKeys.all(), "detail"] as const,
  detail: (id: GatheringType["id"]) =>
    [...gatheringsQueryKeys.details(), id] as const,
  likes: () => [...gatheringsQueryKeys.all(), "like"] as const,
  like: ({ id }: { id: GatheringType["id"] }) => [
    ...gatheringsQueryKeys.likes(),
    id,
  ],
  myGatherings: (pagination: Partial<PaginationReq>) =>
    [...gatheringsQueryKeys.all(), "my", pagination] as const,
  joinedGatherings: (pagination: Partial<PaginationReq>) =>
    [...gatheringsQueryKeys.all(), "joined", pagination] as const,
};
