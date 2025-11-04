// hooks/useSignupMutation.ts
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { authApi } from "@/api/auth";

import { QUERY_KEYS } from "../queries/queryKey";

import { SignupFormSchema } from "./useSignupForm";

/**
 * 회원가입 Mutation Hook
 */
export function useSignupMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: SignupFormSchema) => {
      const { name, email, password } = payload; // confirmPassword, emailCheckPassed 제외
      return authApi.signup({ name, email, password });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.users.my() });
    },
  });
}
