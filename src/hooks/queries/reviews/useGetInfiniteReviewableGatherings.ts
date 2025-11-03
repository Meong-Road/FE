import { useInfiniteQuery } from "@tanstack/react-query";

import REVIEW_API from "@/api/reviews";
import { SortOptionValue } from "@/lib/constants/option";

import { QUERY_KEYS } from "../queryKey";

export function useGetInfiniteReviewableGatherings(
  size = 10,
  sort: SortOptionValue = ["createdAt", "desc"],
) {
  return useInfiniteQuery({
    queryKey: QUERY_KEYS.reviews.reviewableGatherings({ size, sort }),
    queryFn: ({ pageParam }) => {
      return REVIEW_API.getReviewableGatherings({
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
