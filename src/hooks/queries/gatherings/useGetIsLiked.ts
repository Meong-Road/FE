import { useQuery } from "@tanstack/react-query";

import { gatheringApi } from "@/api/gatherings";
import { GetIsLikedReq } from "@/api/types/gatherings";

import { queryKeys } from "../queryKey";

export function useGetIsLiked({
  id,
  enabled = true,
}: GetIsLikedReq & { enabled?: boolean }) {
  return useQuery({
    queryKey: queryKeys.gatherings.like({ id }),
    queryFn: () => gatheringApi.getIsLiked({ id }),
    select: (data) => data.result,
    enabled,
  });
}
