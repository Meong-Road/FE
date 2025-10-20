import { useMutation, useQueryClient } from "@tanstack/react-query";

import { gatheringApi } from "@/api/gatherings";
import { PostLikeReq } from "@/api/types/gatherings";

import { QUERY_KEYS } from "../queryKey";

export function useLike({ id }: PostLikeReq) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => {
      return gatheringApi.like({ id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.gatherings.like({ id }),
      });
    },
  });
}
