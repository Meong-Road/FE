import { useMutation, useQueryClient } from "@tanstack/react-query";

import { authApi } from "@/api/auth";

import { QUERY_KEYS } from "../queries/queryKey";

export function useSignoutMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => authApi.signout(),
    onSuccess: () => {
      // 캐시를 완전히 제거하여 useGetMyInfo가 즉시 null을 반환하도록 함
      queryClient.removeQueries({ queryKey: QUERY_KEYS.users.my() });
    },
  });
}
