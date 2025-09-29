import { useInfiniteQuery } from "@tanstack/react-query";

import { getQuickGatherings } from "@/api/gatherings";
import { GatheringType } from "@/utils/types/gathering";

export const GATHERING_QUERY_KEY = {
  GATHERINGS: ({ type }: { type: GatheringType["type"] }) => [
    "gatherings",
    type,
  ],
};

export const useGetInfiniteGatherings = () => {
  return useInfiniteQuery({
    queryKey: GATHERING_QUERY_KEY.GATHERINGS({ type: "QUICK" }),
    queryFn: ({ pageParam }) =>
      getQuickGatherings({
        page: pageParam,
        pageSize: 10,
        sortBy: "createdAt",
        sortOrder: "desc",
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _, pageParam) =>
      lastPage.hasNext ? pageParam + 1 : undefined,
    select: (data) => data.pages.flatMap((page) => page.data),
  });
};
