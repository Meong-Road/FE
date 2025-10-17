import { useQuery } from "@tanstack/react-query";

import { petsApi } from "@/api/pets";

import { PETS_QUERY_KEYS } from "./queryKey";

export const useGetPetInfo = (id: number) => {
  return useQuery({
    queryKey: PETS_QUERY_KEYS.detail(id),
    queryFn: () => petsApi.getPetInfo({ id }),
    select: (data) => data.result,
    enabled: !!id && id > 0,
  });
};
