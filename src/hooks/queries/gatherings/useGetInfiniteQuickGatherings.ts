import { useInfiniteQuery } from "@tanstack/react-query";

import { gatheringApi } from "@/api/gatherings";
import { PaginationReq } from "@/api/types/common";
import { GetQuickGatheringsReq } from "@/api/types/gatherings";

import { GATHERING_QUERY_KEY } from "./queryKey";

export function useGetInfiniteQuickGatherings({
  size = 10,
  sort = ["createdAt"],
}: Omit<GetQuickGatheringsReq, keyof PaginationReq> & Partial<PaginationReq>) {
  return useInfiniteQuery({
    queryKey: GATHERING_QUERY_KEY.GATHERINGS_QUICK({ size, sort }),
    queryFn: ({ pageParam }) => {
      return gatheringApi.getQuickGatherings({
        page: pageParam,
        size,
        sort,
      });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, _, pageParam) =>
      lastPage.result?.last ? undefined : pageParam + 1,
    select: (data) => data.pages.flatMap((page) => page.result?.content || []),
  });
}
