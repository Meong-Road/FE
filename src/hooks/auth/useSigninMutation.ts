"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { authApi } from "@/api/auth";

import { QUERY_KEYS } from "../queries/queryKey";

import { SigninFormSchema } from "./useSigninForm";

/**
 * 로그인 Mutation Hook
 */
export function useSigninMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: SigninFormSchema) => {
      return authApi.signin(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.users.my() });
    },
  });
}
