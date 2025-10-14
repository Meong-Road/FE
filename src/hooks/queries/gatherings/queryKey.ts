import {
  GetQuickGatheringsReq,
  GetRegularGatheringsReq,
} from "@/api/types/gatherings";
import { GatheringType } from "@/lib/types/gatherings";

export const GATHERING_QUERY_KEY = {
  GATHERINGS: () => ["gatherings"],
  GATHERINGS_REGULAR: (params: Omit<GetRegularGatheringsReq, "page">) => [
    "gatherings",
    "regular",
    params,
  ],
  GATHERINGS_QUICK: (params: Omit<GetQuickGatheringsReq, "page">) => [
    "gatherings",
    "quick",
    params,
  ],
  IS_LIKED: ({ id }: { id: GatheringType["id"] }) => ["isLiked", id],
  GATHERING_DETAIL: ({ id }: { id: GatheringType["id"] }) => ["gatherings", id],
};
