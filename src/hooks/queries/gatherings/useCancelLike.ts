import { useMutation, useQueryClient } from "@tanstack/react-query";

import { gatheringApi } from "@/api/gatherings";
import { CancelLikeReq } from "@/api/types/gatherings";

import { GATHERING_QUERY_KEY } from "./queryKey";

export function useCancelLike({ id }: CancelLikeReq) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      return gatheringApi.cancelLike({ id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: GATHERING_QUERY_KEY.IS_LIKED({ id }),
      });
    },
  });
}
