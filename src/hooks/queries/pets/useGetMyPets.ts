import { useQuery } from "@tanstack/react-query";

import { petsApi } from "@/api/pets";

import { QUERY_KEYS } from "../queryKey";

interface UseGetMyPetsProps {
  enabled?: boolean;
}

export const useGetMyPets = ({ enabled = true }: UseGetMyPetsProps = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.pets.myPets(),
    queryFn: () => petsApi.getMyPetInfo(),
    select: (data) => data.result,
    retry: false,
    enabled,
  });
};
