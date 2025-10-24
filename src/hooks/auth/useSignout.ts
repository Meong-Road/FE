import { useQueryClient } from "@tanstack/react-query";

import { tokenStorage } from "@/lib/utils/storage";

export function useSignout() {
  const queryClient = useQueryClient();

  return () => {
    tokenStorage.clear();
    queryClient.clear();
  };
}
