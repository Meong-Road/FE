import { useQuery } from "@tanstack/react-query";

import { petsApi } from "@/api/pets";

import { QUERY_KEYS } from "../queryKey";

export const useGetPetsByUserId = (userId: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.pets.petInfoByUserId(userId),
    queryFn: () => petsApi.getPetInfoByUserId(userId),
    select: (data) => data.result,
    enabled: !!userId,
  });
};
