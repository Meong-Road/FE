import { useInfiniteQuery } from "@tanstack/react-query";

import { gatheringApi } from "@/api/gatherings";
import { PaginationOptions } from "@/api/types/common";
import { DEFAULT_LIST_OPTIONS } from "@/lib/constants/option";

import { QUERY_KEYS } from "../queryKey";

export const useGetInfiniteJoinedGatherings = (
  options: PaginationOptions = DEFAULT_LIST_OPTIONS,
) => {
  return useInfiniteQuery({
    queryKey: QUERY_KEYS.gatherings.joinedGatheringList(options),
    queryFn: ({ pageParam }) => {
      return gatheringApi.getJoinedGatherings({ page: pageParam, ...options });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, pageParam) =>
      lastPage.result?.last ? undefined : pageParam + 1,
    select: (data) => data.pages.flatMap((page) => page.result?.content || []),
  });
};
