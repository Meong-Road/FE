import { useMutation, useQueryClient } from "@tanstack/react-query";

import { gatheringApi } from "@/api/gatherings";
import { DeleteLikeReq } from "@/api/types/gatherings";

import { QUERY_KEYS } from "../queryKey";

import { EType } from "./queryKey";

export function useCancelLike({ id }: DeleteLikeReq) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      return gatheringApi.cancelLike({ id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.gatherings.bookmark({ id }),
      });
      queryClient.invalidateQueries({
        queryKey: [...QUERY_KEYS.gatherings.lists(), EType.BOOKMARKED],
      });
    },
  });
}
