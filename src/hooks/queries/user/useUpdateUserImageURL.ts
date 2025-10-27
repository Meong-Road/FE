import { useMutation, useQueryClient } from "@tanstack/react-query";

import { PutUserImageRes } from "@/api/types/user";
import { userApi } from "@/api/user";

import { USER_QUERY_KEYS } from "./queryKey";

export function useUpdateUserImageURL() {
  const queryClient = useQueryClient();

  return useMutation<PutUserImageRes, Error, string>({
    mutationFn: (imageUrl: string) => userApi.updateUserImageURL(imageUrl),
    onSuccess: () => {
      // 사용자 정보가 변경되면 캐시를 무효화하여 최신 데이터를 다시 가져옴
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.my() });
    },
  });
}
