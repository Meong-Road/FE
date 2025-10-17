import { useQuery } from "@tanstack/react-query";

import { gatheringApi } from "@/api/gatherings";
import { GetGatheringDetailReq } from "@/api/types/gatherings";

import { queryKeys } from "../queryKey";

export function useGetGatheringDetail({ id }: GetGatheringDetailReq) {
  return useQuery({
    queryKey: queryKeys.gatherings.detail(id),
    queryFn: () => gatheringApi.getGatheringDetail({ id }),
  });
}
