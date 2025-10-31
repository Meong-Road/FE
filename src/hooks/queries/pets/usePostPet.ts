import { useMutation, useQueryClient } from "@tanstack/react-query";

import { petsApi } from "@/api/pets";
import { PostPetReq } from "@/api/types/pets";

import { QUERY_KEYS } from "../queryKey";

export const usePostPet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PostPetReq) => petsApi.postPetInfo(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.pets.myPets() });
    },
  });
};
