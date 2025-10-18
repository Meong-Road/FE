import { useMutation, useQueryClient } from "@tanstack/react-query";

import { petsApi } from "@/api/pets";
import { PetInfoUpdateSchema } from "@/components/Modal/_hooks/usePetInfoForm";

import { queryKeys } from "../queryKey";

export const usePutPet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: PetInfoUpdateSchema }) =>
      petsApi.putPetInfo(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.pets.myPets() });
    },
  });
};
