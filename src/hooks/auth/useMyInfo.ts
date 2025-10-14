import { useQuery } from "@tanstack/react-query";

import { authApi } from "@/api/auth";

export function useMyInfo() {
  return useQuery({
    queryKey: ["me"],
    queryFn: authApi.getMyInfo,
    retry: false,
  });
}
