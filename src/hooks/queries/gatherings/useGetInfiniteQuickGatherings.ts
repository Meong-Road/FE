import { infiniteQueryOptions, useInfiniteQuery } from "@tanstack/react-query";

import { gatheringApi } from "@/api/gatherings";
import { PaginationOptions } from "@/api/types/common";
import { GatheringFilter } from "@/api/types/gatherings";
import { DEFAULT_LIST_OPTIONS } from "@/lib/constants/option";

import { QUERY_KEYS } from "../queryKey";

export function useGetInfiniteQuickGatherings(
  options: PaginationOptions & Partial<GatheringFilter> = DEFAULT_LIST_OPTIONS,
) {
  return useInfiniteQuery(getInfiniteQuickGatheringsOptions(options));
}

export const getInfiniteQuickGatheringsOptions = (
  options: PaginationOptions = DEFAULT_LIST_OPTIONS,
) => {
  return infiniteQueryOptions({
    queryKey: QUERY_KEYS.gatherings.quickList(options),
    queryFn: ({ pageParam }) => {
      return gatheringApi.getQuickGatherings({
        page: pageParam,
        ...options,
      });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, pageParam) =>
      lastPage.result?.last ? undefined : pageParam + 1,
    select: (data) => data.pages.flatMap((page) => page.result?.content || []),
  });
};
