import { useQuery } from "@tanstack/react-query";

import { petsApi } from "@/api/pets";

import { PETS_QUERY_KEYS } from "./queryKey";

export const useGetPet = (
  id: number,
  options?: {
    enabled?: boolean;
  },
) => {
  return useQuery({
    queryKey: PETS_QUERY_KEYS.detail(id),
    queryFn: () => petsApi.getPetInfo(id),
    enabled: !!id && id > 0 && (options?.enabled ?? true),
    select: (data) => data.result,
  });
};
