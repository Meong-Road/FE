import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { petsApi } from "@/api/pets";
import { PetInfoFormSchema } from "@/components/Modal/_hooks/usePetInfoForm";

import { PETS_QUERY_KEYS } from "./queryKey";

export const usePostPet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PetInfoFormSchema) => petsApi.postPetInfo(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PETS_QUERY_KEYS.myPets() });
      toast.success("반려견 정보 등록에 성공했습니다!");
    },
    onError: () => {
      toast.error("반려견 정보 등록에 실패했습니다.");
    },
  });
};
