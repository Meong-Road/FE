import { useMutation, useQueryClient } from "@tanstack/react-query";

import { petsApi } from "@/api/pets";
import { PetInfoFormSchema } from "@/components/Modal/_hooks/usePetInfoForm";

import { QUERY_KEYS } from "../queryKey";

export const usePostPet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PetInfoFormSchema) => petsApi.postPetInfo(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.pets.myPets() });
    },
  });
};
