import { useInfiniteQuery } from "@tanstack/react-query";

import { gatheringApi } from "@/api/gatherings";
import { PaginationReq } from "@/api/types/common";
import { GetQuickGatheringsReq } from "@/api/types/gatherings";

import { queryKeys } from "../queryKey";

export function useGetInfiniteQuickGatherings({
  size = 10,
  sort = ["createdAt"],
}: Omit<GetQuickGatheringsReq, keyof PaginationReq> & Partial<PaginationReq>) {
  return useInfiniteQuery({
    queryKey: queryKeys.gatherings.quickList({ size, sort }),
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
