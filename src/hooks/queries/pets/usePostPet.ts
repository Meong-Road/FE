import { useMutation, useQueryClient } from "@tanstack/react-query";

import { petsApi } from "@/api/pets";
import { PostPetReq } from "@/api/types/pets";
import { GetUserRes } from "@/api/types/user";
import { userApi } from "@/api/user";

import { QUERY_KEYS } from "../queryKey";

export const usePostPet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PostPetReq) => petsApi.postPetInfo(data),
    onSuccess: async () => {
      // 1. 펫 목록 갱신
      await queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.pets.myPets(),
      });

      // 2. isPetInfoSubmitted가 false인 경우에만 true로 업데이트
      const userData = queryClient.getQueryData<GetUserRes>(
        QUERY_KEYS.users.my(),
      );

      if (userData?.result && !userData.result.isPetInfoSubmitted) {
        // isPetInfoSubmitted를 true로 업데이트
        await userApi.updateMyInfo({ isPetInfoSubmitted: true });

        // user 정보 갱신
        await queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.users.my(),
        });
      }
    },
  });
};
