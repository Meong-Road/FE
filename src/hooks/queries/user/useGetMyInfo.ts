import { useQuery } from "@tanstack/react-query";

import { userApi } from "@/api/user";

import { USER_QUERY_KEYS } from "./queryKey";

export const useGetMyInfo = () => {
  return useQuery({
    queryKey: USER_QUERY_KEYS.my(),
    queryFn: () => userApi.getMyInfo(),
    select: (data) => data.result,
    retry: false,
  });
};
