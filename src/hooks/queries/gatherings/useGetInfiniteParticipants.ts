import { infiniteQueryOptions, useInfiniteQuery } from "@tanstack/react-query";

import { gatheringApi } from "@/api/gatherings";
import { PaginationOptions } from "@/api/types/common";
import { DEFAULT_LIST_OPTIONS } from "@/lib/constants/option";
import { GatheringType } from "@/lib/types/gatherings";

import { QUERY_KEYS } from "../queryKey";

export function useGetInfiniteParticipants(
  id: GatheringType["id"],
  options: PaginationOptions = DEFAULT_LIST_OPTIONS,
) {
  return useInfiniteQuery(getInfiniteParticipants(id, options));
}

export const getInfiniteParticipants = (
  id: GatheringType["id"],
  options: PaginationOptions = DEFAULT_LIST_OPTIONS,
) => {
  return infiniteQueryOptions({
    queryKey: QUERY_KEYS.gatherings.participantList({ id }, options),
    queryFn: ({ pageParam }) => {
      return gatheringApi.getParticipants({ id, page: pageParam, ...options });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, pageParam) =>
      lastPage.result?.last ? undefined : pageParam + 1,
    select: (data) => data.pages.flatMap((page) => page.result?.content || []),
  });
};
