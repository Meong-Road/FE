import { useInfiniteQuery } from "@tanstack/react-query";

import { getQuickGatherings, getRegularGatherings } from "@/api/gatherings";
import { EGatheringType, GatheringType } from "@/lib/types/gathering";

export const GATHERING_QUERY_KEY = {
  GATHERINGS: ({ type }: { type: GatheringType["type"] }) => [
    "gatherings",
    type,
  ],
};

export const useGetInfiniteRegularGatherings = () => {
  return useInfiniteQuery({
    queryKey: GATHERING_QUERY_KEY.GATHERINGS({ type: EGatheringType.REGULAR }),
    queryFn: ({ pageParam }) => {
      return getRegularGatherings({
        page: pageParam,
        pageSize: 10,
        sortBy: "createdAt",
        sortOrder: "desc",
      });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, _, pageParam) =>
      lastPage.hasNext ? pageParam + 1 : undefined,
    select: (data) => data.pages.flatMap((page) => page.data),
  });
};

export const useGetInfiniteQuickGatherings = () => {
  return useInfiniteQuery({
    queryKey: GATHERING_QUERY_KEY.GATHERINGS({ type: EGatheringType.QUICK }),
    queryFn: ({ pageParam }) => {
      return getQuickGatherings({
        page: pageParam,
        pageSize: 10,
        sortBy: "createdAt",
        sortOrder: "desc",
      });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, _, pageParam) =>
      lastPage.hasNext ? pageParam + 1 : undefined,
    select: (data) => data.pages.flatMap((page) => page.data),
  });
};
