import { useQuery } from "@tanstack/react-query";

import { petsApi } from "@/api/pets";

import { queryKeys } from "../queryKey";

export const useGetMyPets = () => {
  return useQuery({
    queryKey: queryKeys.pets.myPets(),
    queryFn: () => petsApi.getMyPetInfo(),
    select: (data) => data.result,
  });
};
