"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { userApi } from "@/api/user";
import { QUERY_KEYS } from "@/hooks/queries/queryKey";

export function useSkipPetInfo() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => userApi.updatePetInfoSubmitted(),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.pets.myPets() });
      // isPetInfoSubmitted가 true로 변경되었으므로 user 정보 갱신
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.users.my() });
    },
  });

  return {
    skipPetInfo: mutation.mutate,
    isPending: mutation.isPending,
  };
}
