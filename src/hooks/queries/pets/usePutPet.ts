import { useMutation, useQueryClient } from "@tanstack/react-query";

import { petsApi } from "@/api/pets";
import { GetPetReq, PutPetReq } from "@/api/types/pets";

import { QUERY_KEYS } from "../queryKey";

export const usePutPet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: GetPetReq["id"]; data: PutPetReq }) =>
      petsApi.putPetInfo(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.pets.myPets() });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.pets.detail(id) });
    },
  });
};
