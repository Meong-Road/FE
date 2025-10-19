import { useMutation, useQueryClient } from "@tanstack/react-query";

import { gatheringApi } from "@/api/gatherings";
import { DeleteLikeReq } from "@/api/types/gatherings";

import { queryKeys } from "../queryKey";

export function useCancelLike({ id }: DeleteLikeReq) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      return gatheringApi.cancelLike({ id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.gatherings.like({ id }),
      });
    },
  });
}
