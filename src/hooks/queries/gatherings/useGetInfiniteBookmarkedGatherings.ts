import { useInfiniteQuery } from "@tanstack/react-query";

import { gatheringApi } from "@/api/gatherings";
import { EGatheringType } from "@/lib/types/gatherings";

export function useGetInfiniteBookmarkedGatherings(
  currentTab: string,
  size: number = 10,
  sort: string = "createdAt",
) {
  return useInfiniteQuery({
    queryKey: ["bookmarkedGatherings", currentTab, size, sort],
    queryFn: ({ pageParam }) => {
      return gatheringApi.getMyBookmarkedGatherings({
        type:
          currentTab === "regular"
            ? EGatheringType.REGULAR
            : EGatheringType.QUICK,
        page: Number(pageParam),
        size,
        sort,
      });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) =>
      !lastPage.result.last ? allPages.length : undefined,
    select: (data) =>
      data.pages.flatMap((page) => page.result.content || []) || [],
  });
}
