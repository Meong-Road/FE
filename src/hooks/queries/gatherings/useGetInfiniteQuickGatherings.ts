import { useInfiniteQuery } from "@tanstack/react-query";

import { gatheringApi } from "@/api/gatherings";
import { PaginationReq } from "@/api/types/common";
import { GetQuickGatheringsReq } from "@/api/types/gatherings";
import { DEFAULT_LIST_OPTIONS } from "@/lib/constants/option";

import { queryKeys } from "../queryKey";

interface UseGetInfiniteQuickGatheringsProps
  extends Omit<GetQuickGatheringsReq, keyof PaginationReq>,
    Partial<PaginationReq> {}

export function useGetInfiniteQuickGatherings({
  size = DEFAULT_LIST_OPTIONS.size,
  sort = DEFAULT_LIST_OPTIONS.sort,
}: UseGetInfiniteQuickGatheringsProps) {
  return useInfiniteQuery({
    queryKey: queryKeys.gatherings.quickList({
      size,
      sort,
    }),
    queryFn: ({ pageParam }) => {
      return gatheringApi.getQuickGatherings({
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
