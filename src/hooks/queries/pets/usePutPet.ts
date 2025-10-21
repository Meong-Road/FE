import { useMutation, useQueryClient } from "@tanstack/react-query";

import { petsApi } from "@/api/pets";
import { PutPetReq } from "@/api/types/pets";

import { QUERY_KEYS } from "../queryKey";

export const usePutPet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: PutPetReq }) =>
      petsApi.putPetInfo(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.pets.myPets() });
    },
  });
};
