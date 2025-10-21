import { useQuery } from "@tanstack/react-query";

import { gatheringApi } from "@/api/gatherings";
import { GetGatheringReq } from "@/api/types/gatherings";

import { QUERY_KEYS } from "../queryKey";

export function useGetGatheringDetail({ id }: GetGatheringReq) {
  return useQuery({
    queryKey: QUERY_KEYS.gatherings.detail(id),
    queryFn: () => gatheringApi.getGathering({ id }),
  });
}
