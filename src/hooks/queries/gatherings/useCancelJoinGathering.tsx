import { useMutation, useQueryClient } from "@tanstack/react-query";

import { gatheringApi } from "@/api/gatherings";
import { DeleteJoinGatheringReq } from "@/api/types/gatherings";

import { QUERY_KEYS } from "../queryKey";

export function useCancelJoinGathering() {
  const queryClient = useQueryClient();
  // cnst searchParams = useSearchParams();

  return useMutation({
    mutationFn: ({ id }: DeleteJoinGatheringReq) =>
      gatheringApi.cancelJoinGathering({ id }),
    onMutate: async ({ id }, context) => {
      await Promise.all([
        context.client.cancelQueries({
          queryKey: QUERY_KEYS.gatherings.lists(),
        }),
        // context.client.cancelQueries({
        //   queryKey: QUERY_KEYS.gatherings.detail(id),
        // }),
      ]);

      // 1) 둘 다 setQueryData 하기
      // context.client.setQueryData(["todos"], (old) => [...old, newTodo]);
    },
    onSettled: (_, __, { id }) => {
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.gatherings.lists(),
        }),
        // query
      ]);
    },
  });
}
