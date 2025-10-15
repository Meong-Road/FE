import { useQuery } from "@tanstack/react-query";

import { authApi } from "@/api/auth";

export function useAuthUser() {
  return useQuery({
    queryKey: ["me"],
    queryFn: authApi.getMyInfo,
    select: (data) => data.result.user,
    retry: false,
  });
}
