import { useQueryClient } from "@tanstack/react-query";

import { tokenStorage } from "@/lib/utils/token";

import { USER_QUERY_KEYS } from "../queries/user/queryKey";

export function useSignout() {
  const queryClient = useQueryClient();

  return () => {
    tokenStorage.clear();
    queryClient.clear();
  };
}
