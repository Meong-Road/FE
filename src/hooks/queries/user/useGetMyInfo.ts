import { useQuery } from "@tanstack/react-query";

import { userApi } from "@/api/user";

import { QUERY_KEYS } from "../queryKey";

export const useGetMyInfo = ({
  enabled = true,
}: {
  enabled?: boolean;
} = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.users.my(),
    queryFn: () => userApi.getMyInfo(),
    select: (data) => data.result,
    staleTime: Infinity,
    gcTime: Infinity,
    enabled,
  });
};
