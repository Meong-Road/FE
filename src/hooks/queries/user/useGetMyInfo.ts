import { useQuery } from "@tanstack/react-query";

import { userApi } from "@/api/user";
import { ApiError } from "@/lib/api/customFetch";

import { QUERY_KEYS } from "../queryKey";

export const useGetMyInfo = ({
  enabled = true,
}: {
  enabled?: boolean;
} = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.users.my(),
    queryFn: async () => {
      try {
        return await userApi.getMyInfo();
      } catch (error) {
        if (error instanceof ApiError && error.statusCode === 401) {
          return null;
        }
        throw error;
      }
    },
    select: (data) => data?.result ?? null,
    staleTime: Infinity,
    gcTime: Infinity,
    enabled,
    retry: (failureCount) => {
      return failureCount < 3;
    },
  });
};
