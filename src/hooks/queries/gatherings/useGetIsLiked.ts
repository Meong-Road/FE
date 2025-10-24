import { useQuery } from "@tanstack/react-query";

import { gatheringApi } from "@/api/gatherings";
import { GetIsLikedReq } from "@/api/types/gatherings";

import { QUERY_KEYS } from "../queryKey";

export function useGetIsLiked({
  id,
  enabled = true,
}: GetIsLikedReq & { enabled?: boolean }) {
  return useQuery({
    queryKey: QUERY_KEYS.gatherings.bookmark({ id }),
    queryFn: () => gatheringApi.getIsLiked({ id }),
    select: (data) => data.result,
    enabled,
  });
}
