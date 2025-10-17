import { useQuery } from "@tanstack/react-query";

import { authApi } from "@/api/auth";
import { GetUserRes } from "@/api/types/auth";

export function useAuthUser() {
  return useQuery({
    queryKey: ["user", "me"],
    queryFn: authApi.getMyInfo,
    select: (data: GetUserRes) => data.result,
    retry: false,
  });
}
