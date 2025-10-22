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
    },
  });

  return {
    skipPetInfo: mutation.mutate,
    isPending: mutation.isPending,
  };
}
