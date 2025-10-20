import { useMutation, useQueryClient } from "@tanstack/react-query";

import { petsApi } from "@/api/pets";
import { DeletePetReq } from "@/api/types/pets";

import { QUERY_KEYS } from "../queryKey";

export const useDeletePet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: DeletePetReq) => petsApi.deletePetInfo(data.id),
    onSuccess: () => {
      // 펫 목록을 다시 가져오기
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.pets.myPets() });
    },
  });
};
