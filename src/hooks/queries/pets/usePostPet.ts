import { useMutation, useQueryClient } from "@tanstack/react-query";

import { petsApi } from "@/api/pets";
import { PetInfoFormSchema } from "@/components/Modal/_hooks/usePetInfoForm";

import { queryKeys } from "../queryKey";

export const usePostPet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PetInfoFormSchema) => petsApi.postPetInfo(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.pets.myPets() });
    },
  });
};
