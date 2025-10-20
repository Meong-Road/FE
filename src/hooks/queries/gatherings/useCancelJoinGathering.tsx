import { useMutation, useQueryClient } from "@tanstack/react-query";

import { gatheringApi } from "@/api/gatherings";
import { DeleteJoinGatheringReq } from "@/api/types/gatherings";

import { QUERY_KEYS } from "../queryKey";

export function useCancelJoinGathering() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: DeleteJoinGatheringReq) =>
      gatheringApi.cancelJoinGathering({ id }),
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
