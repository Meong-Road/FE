import { infiniteQueryOptions, useInfiniteQuery } from "@tanstack/react-query";

import { gatheringApi } from "@/api/gatherings";
import { PaginationOptions } from "@/api/types/common";
import { RegularGatheringFilters } from "@/api/types/gatherings";
import { DEFAULT_LIST_OPTIONS } from "@/lib/constants/option";

import { QUERY_KEYS } from "../queryKey";

interface GetInfiniteRegularGatheringsOptions
  extends PaginationOptions,
    RegularGatheringFilters {}

export function useGetInfiniteRegularGatherings(
  options: GetInfiniteRegularGatheringsOptions = DEFAULT_LIST_OPTIONS,
) {
  return useInfiniteQuery(getInfiniteRegularGatheringsOptions(options));
}

export const getInfiniteRegularGatheringsOptions = (
  options: GetInfiniteRegularGatheringsOptions = DEFAULT_LIST_OPTIONS,
) => {
  return infiniteQueryOptions({
    queryKey: QUERY_KEYS.gatherings.regularList({ ...options }),
    queryFn: ({ pageParam = 0 }) => {
      return gatheringApi.getRegularGatherings({
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
