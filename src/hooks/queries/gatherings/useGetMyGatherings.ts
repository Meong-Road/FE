import { useQuery } from "@tanstack/react-query";

import { gatheringApi } from "@/api/gatherings";
import { GetMyGatheringsReq } from "@/api/types/gatherings";

import { gatheringsQueryKeys } from "./queryKey";

export const useGetMyGatherings = ({
  page = 0,
  size = 10,
  sort = ["createdAt", "desc"],
}: Partial<GetMyGatheringsReq> = {}) => {
  return useQuery({
    queryKey: gatheringsQueryKeys.myGatherings({ page, size, sort }),
    queryFn: () => gatheringApi.getMyGatherings({ page, size, sort }),
    select: (data) => data.result,
  });
};
