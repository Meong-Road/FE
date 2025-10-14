import { useMutation, useQueryClient } from "@tanstack/react-query";

import { gatheringApi } from "@/api/gatherings";
import { LikeReq } from "@/api/types/gatherings";

import { GATHERING_QUERY_KEY } from "./queryKey";

export function useLike({ id }: LikeReq) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => {
      return gatheringApi.like({ id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: GATHERING_QUERY_KEY.IS_LIKED({ id }),
      });
    },
  });
}
