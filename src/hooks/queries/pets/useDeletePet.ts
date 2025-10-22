import { useMutation, useQueryClient } from "@tanstack/react-query";

import { petsApi } from "@/api/pets";

import { QUERY_KEYS } from "../queryKey";

export const useDeletePet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (petId: number) => petsApi.deletePetInfo(petId),
    onSuccess: () => {
      // 펫 목록을 다시 가져오기
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.pets.myPets() });
    },
  });
};
