import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";

import { gatheringApi } from "@/api/gatherings";
import { PaginationReq } from "@/api/types/common";
import {
  CancelLikeReq,
  GetGatheringDetailReq,
  GetIsLikedReq,
  GetQuickGatheringsReq,
  GetRegularGatheringsReq,
  LikeReq,
} from "@/api/types/gatherings";
import { EGatheringType, GatheringType } from "@/lib/types/gatherings";

export const GATHERING_QUERY_KEY = {
  GATHERINGS: () => ["gatherings"],
  GATHERINGS_REGULAR: (params: Omit<GetRegularGatheringsReq, "page">) => [
    "gatherings",
    "regular",
    params,
  ],
  GATHERINGS_QUICK: (params: Omit<GetQuickGatheringsReq, "page">) => [
    "gatherings",
    "quick",
    params,
  ],
  IS_LIKED: ({ id }: { id: GatheringType["id"] }) => ["isLiked", id],
  GATHERING_DETAIL: ({ id }: { id: GatheringType["id"] }) => ["gatherings", id],
};

export const useGetInfiniteRegularGatherings = ({
  size = 10,
  sort = ["createdAt"],
}: Omit<GetRegularGatheringsReq, keyof PaginationReq> &
  Partial<PaginationReq>) => {
  return useInfiniteQuery({
    queryKey: GATHERING_QUERY_KEY.GATHERINGS_REGULAR({ size, sort }),
    queryFn: ({ pageParam }) => {
      return gatheringApi.getRegularGatherings({
        page: pageParam,
        size,
        sort,
      });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, _, pageParam) =>
      lastPage.last ? undefined : pageParam + 1,
    select: (data) => data.pages.flatMap((page) => page.content),
  });
};

export const useGetInfiniteQuickGatherings = ({
  size = 10,
  sort = ["createdAt"],
}: Omit<GetQuickGatheringsReq, keyof PaginationReq> &
  Partial<PaginationReq>) => {
  return useInfiniteQuery({
    queryKey: GATHERING_QUERY_KEY.GATHERINGS_QUICK({ size, sort }),
    queryFn: ({ pageParam }) => {
      return gatheringApi.getQuickGatherings({
        page: pageParam,
        size,
        sort,
      });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, _, pageParam) =>
      lastPage.last ? undefined : pageParam + 1,
    select: (data) => data.pages.flatMap((page) => page.content),
  });
};

export const useGetIsLiked = ({ id }: GetIsLikedReq) => {
  return useQuery({
    queryKey: GATHERING_QUERY_KEY.IS_LIKED({ id }),
    queryFn: () => {
      return gatheringApi.getIsLiked({ id });
    },
  });
};

export const useLike = ({
  id,
  onSuccess,
}: LikeReq & {
  onSuccess: () => void;
}) => {
  return useMutation({
    mutationFn: () => {
      return gatheringApi.like({ id });
    },
    onSuccess,
  });
};

export const useCancelLike = ({
  id,
  onSuccess,
}: CancelLikeReq & {
  onSuccess: () => void;
}) => {
  return useMutation({
    mutationFn: () => {
      return gatheringApi.cancelLike({ id });
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
};

export const useGetGatheringDetail = ({ id }: GetGatheringDetailReq) => {
  return useQuery({
    queryKey: GATHERING_QUERY_KEY.GATHERING_DETAIL({ id }),
    queryFn: () => gatheringApi.getGatheringDetail({ id }),
  });
};
