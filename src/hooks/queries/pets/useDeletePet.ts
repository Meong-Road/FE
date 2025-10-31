import { useMutation, useQueryClient } from "@tanstack/react-query";

import { petsApi } from "@/api/pets";
import { GetMyPetsRes } from "@/api/types/pets";
import { userApi } from "@/api/user";

import { QUERY_KEYS } from "../queryKey";

export const useDeletePet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (petId: number) => petsApi.deletePetInfo(petId),
    onSuccess: async () => {
      // 1. 펫 목록 갱신 및 refetch 완료 대기
      await queryClient.refetchQueries({ queryKey: QUERY_KEYS.pets.myPets() });

      // 2. 최신 펫 목록 확인
      const petsResponse = queryClient.getQueryData<GetMyPetsRes>(
        QUERY_KEYS.pets.myPets(),
      );
      const pets = petsResponse?.result; // API 응답 구조 처리

      // 3. 펫이 0개일 때만 isPetInfoSubmitted를 false로 업데이트
      if (pets && pets.length === 0) {
        // isPetInfoSubmitted를 false로 업데이트
        await userApi.updateMyInfo({ isPetInfoSubmitted: false });

        // user 정보 갱신
        await queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.users.my(),
        });
      }
    },
  });
};
