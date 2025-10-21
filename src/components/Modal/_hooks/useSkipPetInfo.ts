"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { userApi } from "@/api/user";
import { QUERY_KEYS } from "@/hooks/queries/queryKey";

export function useSkipPetInfo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => userApi.updatePetInfoSubmitted(),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.users.my() });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.pets.myPets() });
    },
  });
}
