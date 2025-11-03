import { useQuery } from "@tanstack/react-query";

import { userApi } from "@/api/user";

import { QUERY_KEYS } from "../queryKey";

export const useGetUserById = (userId: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.users.byId(userId),
    queryFn: () => userApi.getUserById({ userId }),
    select: (data) => data.result,
    enabled: !!userId,
  });
};
