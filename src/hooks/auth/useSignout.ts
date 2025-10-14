import { useQueryClient } from "@tanstack/react-query";

import { authService } from "@/services/authService";

export function useSignout() {
  const queryClient = useQueryClient();

  return () => {
    authService.signout();
    queryClient.invalidateQueries({ queryKey: ["me"] });
  };
}
