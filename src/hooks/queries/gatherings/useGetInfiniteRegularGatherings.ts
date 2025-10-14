import { useInfiniteQuery } from "@tanstack/react-query";

import { gatheringApi } from "@/api/gatherings";
import { PaginationReq } from "@/api/types/common";
import { GetRegularGatheringsReq } from "@/api/types/gatherings";

import { GATHERING_QUERY_KEY } from "./queryKey";

export function useGetInfiniteRegularGatherings({
  size = 10,
  sort = ["createdAt"],
}: Omit<GetRegularGatheringsReq, keyof PaginationReq> &
  Partial<PaginationReq>) {
  return useInfiniteQuery({
    queryKey: GATHERING_QUERY_KEY.GATHERINGS_REGULAR({ size, sort }),
    queryFn: ({ pageParam }) => {
      return gatheringApi.getRegularGatherings({
        page: pageParam,
        size,
        sort,
      });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, _, pageParam) =>
      lastPage.last ? undefined : pageParam + 1,
    select: (data) => data.pages.flatMap((page) => page.content),
  });
}
