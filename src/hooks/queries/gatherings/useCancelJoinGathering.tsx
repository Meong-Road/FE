import { useMutation, useQueryClient } from "@tanstack/react-query";

import { gatheringApi } from "@/api/gatherings";
import { DeleteJoinGatheringReq } from "@/api/types/gatherings";

import { QUERY_KEYS } from "../queryKey";

export default function useCancelJoinGathering() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id }: DeleteJoinGatheringReq) => {
      return await gatheringApi.cancelJoinGathering({ id });
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
