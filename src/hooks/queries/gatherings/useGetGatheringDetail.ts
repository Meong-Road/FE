import { useQuery } from "@tanstack/react-query";

import { gatheringApi } from "@/api/gatherings";
import { GetGatheringReq } from "@/api/types/gatherings";

import { queryKeys } from "../queryKey";

export function useGetGatheringDetail({ id }: GetGatheringReq) {
  return useQuery({
    queryKey: queryKeys.gatherings.detail(id),
    queryFn: () => gatheringApi.getGathering({ id }),
  });
}
