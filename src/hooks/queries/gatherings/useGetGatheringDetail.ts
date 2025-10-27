import { useQuery } from "@tanstack/react-query";

import { gatheringApi } from "@/api/gatherings";
import { GetGatheringReq, GetGatheringRes } from "@/api/types/gatherings";
import { GatheringType } from "@/lib/types/gatherings";

import { QUERY_KEYS } from "../queryKey";

export function useGetGatheringDetail({ id }: GetGatheringReq) {
  return useQuery<GetGatheringRes, Error, GatheringType>({
    queryKey: QUERY_KEYS.gatherings.detail(id),
    queryFn: () => gatheringApi.getGathering({ id }),
    select: (data) => data.result as GatheringType,
  });
}
