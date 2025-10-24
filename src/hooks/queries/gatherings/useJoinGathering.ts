import { useMutation, useQueryClient } from "@tanstack/react-query";

import { gatheringApi } from "@/api/gatherings";
import { PostJoinGatheringReq } from "@/api/types/gatherings";

import { QUERY_KEYS } from "../queryKey";

export function useJoinGathering() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: PostJoinGatheringReq) =>
      gatheringApi.joinGathering({ id }),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.gatherings.participation({ id }),
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.gatherings.lists(),
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.gatherings.detail(id),
      });
      await queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.gatherings.detail(id),
      });
    },
  });
}
