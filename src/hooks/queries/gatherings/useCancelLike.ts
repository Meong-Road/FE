import { useMutation, useQueryClient } from "@tanstack/react-query";

import { gatheringApi } from "@/api/gatherings";
import { DeleteLikeReq } from "@/api/types/gatherings";
import { EGatheringType } from "@/lib/types/gatherings";

import { QUERY_KEYS } from "../queryKey";

export function useCancelLike({ id }: DeleteLikeReq) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      return gatheringApi.cancelLike({ id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.gatherings.like({ id }),
      });
      queryClient.invalidateQueries({
        queryKey: [...QUERY_KEYS.gatherings.all(), "bookmarked"],
      });
    },
  });
}
