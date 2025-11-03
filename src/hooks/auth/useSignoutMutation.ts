import { useMutation } from "@tanstack/react-query";

import { authApi } from "@/api/auth";

export function useSignoutMutation() {
  return useMutation({
    mutationFn: () => authApi.signout(),
  });
}
