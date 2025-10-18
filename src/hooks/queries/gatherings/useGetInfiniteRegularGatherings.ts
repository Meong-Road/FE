import { useInfiniteQuery } from "@tanstack/react-query";

import { gatheringApi } from "@/api/gatherings";
import { PaginationReq } from "@/api/types/common";
import { GetRegularGatheringsReq } from "@/api/types/gatherings";

import { queryKeys } from "../queryKey";

export function useGetInfiniteRegularGatherings({
  size = 10,
  sort = ["createdAt"],
}: Omit<GetRegularGatheringsReq, keyof PaginationReq> &
  Partial<PaginationReq>) {
  return useInfiniteQuery({
    queryKey: queryKeys.gatherings.regularList({ size, sort }),
    queryFn: ({ pageParam }) => {
      return gatheringApi.getRegularGatherings({
        page: pageParam,
        size,
        sort,
      });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, pageParam) =>
      lastPage.result?.last ? undefined : pageParam + 1,
    select: (data) => data.pages.flatMap((page) => page.result?.content || []),
  });
}
