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
  });
};
