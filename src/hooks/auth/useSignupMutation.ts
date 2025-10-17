// hooks/useSignupMutation.ts
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { authApi } from "@/api/auth";
import { PostSignupRes } from "@/api/types/auth";
import { tokenStorage } from "@/lib/utils/token";

import { SignupFormSchema } from "./useSignupForm";

export function useSignupMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: SignupFormSchema) => {
      const { name, email, password } = payload; // confirmPassword, emailCheckPassed 제외
      return authApi.signup({ name, email, password });
    },
    onSuccess: (data: PostSignupRes) => {
      tokenStorage.set(data.result.token, null); // signup은 아직 리프레시 없음
      queryClient.invalidateQueries({ queryKey: ["user", "me"] });
    },
  });
}
