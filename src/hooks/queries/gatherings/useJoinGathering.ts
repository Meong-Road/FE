import { useMutation, useQueryClient } from "@tanstack/react-query";

import { gatheringApi } from "@/api/gatherings";
import { PostJoinGatheringReq } from "@/api/types/gatherings";

import { QUERY_KEYS } from "../queryKey";

export function useJoinGathering() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id }: PostJoinGatheringReq) => {
      return await gatheringApi.joinGathering({ id });
    },
    onSuccess: async (_, { id }) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.gatherings.lists(),
        }),
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.gatherings.detail(id),
        }),
      ]);
    },
  });
}
