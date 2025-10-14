import { useQuery } from "@tanstack/react-query";

import { gatheringApi } from "@/api/gatherings";
import { GetGatheringDetailReq } from "@/api/types/gatherings";

import { GATHERING_QUERY_KEY } from "./queryKey";

export function useGetGatheringDetail({ id }: GetGatheringDetailReq) {
  return useQuery({
    queryKey: GATHERING_QUERY_KEY.GATHERING_DETAIL({ id }),
    queryFn: () => gatheringApi.getGatheringDetail({ id }),
  });
}
