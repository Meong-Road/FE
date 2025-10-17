import { useMutation, useQueryClient } from "@tanstack/react-query";

import { petsApi } from "@/api/pets";
import { PetInfoUpdateSchema } from "@/components/Modal/_hooks/usePetInfoForm";

import { PETS_QUERY_KEYS } from "./queryKey";

export const usePutPetInfo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: PetInfoUpdateSchema }) =>
      petsApi.putPetInfo(id, data),
    onSuccess: () => {
      // 펫 목록을 다시 가져오기
      queryClient.invalidateQueries({ queryKey: PETS_QUERY_KEYS.myPets() });
    },
  });
};
