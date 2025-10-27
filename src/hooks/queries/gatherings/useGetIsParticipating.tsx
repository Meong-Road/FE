import { useQuery } from "@tanstack/react-query";

import { gatheringApi } from "@/api/gatherings";
import { GetIsParticipatingReq } from "@/api/types/gatherings";

import { QUERY_KEYS } from "../queryKey";

export function useGetIsParticipating({
  id,
  enabled = true,
}: GetIsParticipatingReq & { enabled?: boolean }) {
  return useQuery({
    queryKey: QUERY_KEYS.gatherings.participation({ id }),
    queryFn: () => gatheringApi.getIsParticipating({ id }),
    select: (data) => data.result?.isParticipated ?? false,
    enabled,
  });
}
