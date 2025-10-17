import { useQuery } from "@tanstack/react-query";

import { userApi } from "@/api/user";

import { USER_QUERY_KEYS } from "./queryKey";

export const useGetMyInfo = ({
  enabled = true,
}: {
  enabled?: boolean;
} = {}) => {
  return useQuery({
    queryKey: USER_QUERY_KEYS.my(),
    queryFn: () => userApi.getMyInfo(),
    select: (data) => data.result,
    staleTime: Infinity,
    gcTime: Infinity,
    enabled,
  });
};
