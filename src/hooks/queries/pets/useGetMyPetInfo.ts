import { useQuery } from "@tanstack/react-query";

import { petsApi } from "@/api/pets";

import { PETS_QUERY_KEYS } from "./queryKey";

export const useGetMyPetInfo = () => {
  return useQuery({
    queryKey: PETS_QUERY_KEYS.myPets(),
    queryFn: () => petsApi.getMyPetInfo(),
  });
};
