import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";

import {
  cancelLike,
  getIsLiked,
  getMyBookmarkedGatherings,
  getQuickGatherings,
  getRegularGatherings,
  like,
} from "@/api/gatherings";
import { EGatheringType, GatheringType } from "@/lib/types/gathering";

export const GATHERING_QUERY_KEY = {
  GATHERINGS: ({ type }: { type: GatheringType["type"] }) => [
    "gatherings",
    type,
  ],
  IS_LIKED: ({ id }: { id: GatheringType["id"] }) => ["isLiked", id],
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

export const useGetIsLiked = ({ id }: { id: GatheringType["id"] }) => {
  return useQuery({
    queryKey: GATHERING_QUERY_KEY.IS_LIKED({ id }),
    queryFn: () => {
      return getIsLiked(id);
    },
  });
};

export const useLike = ({
  id,
  onSuccess,
}: {
  id: GatheringType["id"];
  onSuccess: () => void;
}) => {
  return useMutation({
    mutationFn: () => {
      return like(id);
    },
    onSuccess,
  });
};

export const useCancelLike = ({
  id,
  onSuccess,
}: {
  id: GatheringType["id"];
  onSuccess: () => void;
}) => {
  return useMutation({
    mutationFn: () => {
      return cancelLike(id);
    },
    onSuccess,
  });
};

export const useGetInfiniteBookmarkedGatherings = (
  currentTab: string,
  size: number = 10,
  sort: string = "createdAt",
) => {
  return useInfiniteQuery({
    queryKey: ["bookmarkedGatherings", currentTab, size, sort],
    queryFn: ({ pageParam }) => {
      return getMyBookmarkedGatherings({
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
};
