import { useQuery } from "@tanstack/react-query";

import { petsApi } from "@/api/pets";

import { QUERY_KEYS } from "../queryKey";

export const useGetPet = (
  id: number,
  options?: {
    enabled?: boolean;
  },
) => {
  return useQuery({
    queryKey: QUERY_KEYS.pets.detail(id),
    queryFn: () => petsApi.getPetInfo(id),
    enabled: !!id && id > 0 && (options?.enabled ?? true),
    select: (data) => data.result,
    retry: false, // 실패 시 재시도하지 않음
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
  });
};
