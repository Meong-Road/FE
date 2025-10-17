import { useQueryClient } from "@tanstack/react-query";

import { tokenStorage } from "@/lib/utils/token";

export function useSignout() {
  const queryClient = useQueryClient();

  return () => {
    tokenStorage.clear();
    queryClient.removeQueries({ queryKey: ["user", "me"] });
  };
}
