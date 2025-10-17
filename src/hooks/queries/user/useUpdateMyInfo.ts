import { useMutation, useQueryClient } from "@tanstack/react-query";

import { PutUserReq } from "@/api/types/user";
import { userApi } from "@/api/user";

import { USER_QUERY_KEYS } from "./queryKey";

export const useUpdateMyInfo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PutUserReq) => userApi.updateMyInfo(data),
    onSuccess: () => {
      // 사용자 정보가 변경되면 캐시를 무효화하여 최신 데이터를 다시 가져옴
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.my() });
    },
  });
};
