import { useMutation, useQueryClient } from "@tanstack/react-query";

import { authApi } from "@/api/auth";

import { QUERY_KEYS } from "../queries/queryKey";

export function useSignoutMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => authApi.signout(),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: QUERY_KEYS.users.my() });
    },
  });
}
