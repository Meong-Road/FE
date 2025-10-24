import { useInfiniteQuery } from "@tanstack/react-query";

import { gatheringApi } from "@/api/gatherings";
import { EGatheringType } from "@/lib/types/gatherings";

import { QUERY_KEYS } from "../queryKey";

export function useGetInfiniteBookmarkedGatherings(
  currentTab: EGatheringType,
  size = 10,
  sort = ["createdAt"],
) {
  return useInfiniteQuery({
    queryKey: QUERY_KEYS.gatherings.bookmarkedList(currentTab, {
      size,
      sort,
    }),
    queryFn: ({ pageParam }) => {
      return gatheringApi.getMyBookmarkedGatherings({
        type: currentTab,
        page: pageParam,
        size,
        sort,
      });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, pageParam) =>
      lastPage.result?.last ? undefined : pageParam + 1,
    select: (data) =>
      data.pages.flatMap((page) => page.result?.content || []) || [],
  });
}
