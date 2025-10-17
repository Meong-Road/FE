"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { authApi } from "@/api/auth";
import { PostSigninRes } from "@/api/types/auth";
import { tokenStorage } from "@/lib/utils/token";

import { SigninFormSchema } from "./useSigninForm";

export function useSigninMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: SigninFormSchema) => {
      return authApi.signin(payload);
    },
    onSuccess: (data: PostSigninRes) => {
      tokenStorage.set(data.result.token, data.result.refreshToken);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
}
