import { useMutation, useQueryClient } from "@tanstack/react-query";

import { gatheringApi } from "@/api/gatherings";
import { PostGatheringReq } from "@/api/types/gatherings";

import { QUERY_KEYS } from "../queryKey";

export function usePostGathering() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (gathering: PostGatheringReq) =>
      gatheringApi.postGathering(gathering),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.gatherings.all(),
      }),
  });
}
