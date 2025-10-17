import { useQuery } from "@tanstack/react-query";

import { gatheringApi } from "@/api/gatherings";
import { GetJoinedGatheringsReq } from "@/api/types/gatherings";

import { gatheringsQueryKeys } from "./queryKey";

export const useGetJoinedGatherings = ({
  page = 0,
  size = 10,
  sort = ["createdAt", "desc"],
}: Partial<GetJoinedGatheringsReq> = {}) => {
  return useQuery({
    queryKey: gatheringsQueryKeys.joinedGatherings({ page, size, sort }),
    queryFn: () => gatheringApi.getJoinedGatherings({ page, size, sort }),
    select: (data) => data.result,
  });
};
