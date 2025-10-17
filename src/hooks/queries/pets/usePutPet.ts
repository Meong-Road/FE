import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { petsApi } from "@/api/pets";
import { PetInfoUpdateSchema } from "@/components/Modal/_hooks/usePetInfoForm";

import { PETS_QUERY_KEYS } from "./queryKey";

export const usePutPet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: PetInfoUpdateSchema }) =>
      petsApi.putPetInfo(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PETS_QUERY_KEYS.myPets() });
      toast.success("반려견 정보 수정에 성공했습니다!");
    },
    onError: () => {
      toast.error("반려견 정보 수정에 실패했습니다.");
    },
  });
};
