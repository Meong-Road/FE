import { useInfiniteQuery } from "@tanstack/react-query";

import { gatheringApi } from "@/api/gatherings";
import { PaginationReq } from "@/api/types/common";
import { GetMyGatheringsReq } from "@/api/types/gatherings";

import { queryKeys } from "../queryKey";

export const useGetInfiniteMyGatherings = ({
  size = 10,
  sort = ["createdAt", "desc"],
}: Omit<GetMyGatheringsReq, keyof PaginationReq> & Partial<PaginationReq>) => {
  return useInfiniteQuery({
    queryKey: queryKeys.gatherings.myGatherings({ size, sort }),
    queryFn: ({ pageParam }) => {
      return gatheringApi.getMyGatherings({ page: pageParam, size, sort });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, pageParam) =>
      lastPage.result?.last ? undefined : pageParam + 1,
    select: (data) => data.pages.flatMap((page) => page.result?.content || []),
  });
};
