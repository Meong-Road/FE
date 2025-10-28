import { useMutation, useQueryClient } from "@tanstack/react-query";

import { gatheringApi } from "@/api/gatherings";
import { DeleteGatheringReq } from "@/api/types/gatherings";

import { QUERY_KEYS } from "../queryKey";

export function useCancelGathering() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: DeleteGatheringReq) =>
      gatheringApi.cancelGathering({ id }),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.gatherings.lists(),
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.gatherings.detail(id),
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.gatherings.participation({ id }),
      });
    },
  });
}
