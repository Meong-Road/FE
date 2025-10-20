import { useQuery } from "@tanstack/react-query";

import { petsApi } from "@/api/pets";

import { QUERY_KEYS } from "../queryKey";

export const useGetMyPets = () => {
  return useQuery({
    queryKey: QUERY_KEYS.pets.myPets(),
    queryFn: () => petsApi.getMyPetInfo(),
    select: (data) => data.result,
  });
};
