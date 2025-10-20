"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { userApi } from "@/api/user";

export function useSkipPetInfo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => userApi.updatePetInfoSubmitted(),

    onSuccess: () => {
      toast.success("반려동물 정보가 등록되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["user", "me"] });
    },

    onError: (error: Error) => {
      console.error("Pet submission error:", error);
    },
  });
}
