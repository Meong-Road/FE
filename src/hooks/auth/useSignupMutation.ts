// hooks/useSignupMutation.ts
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { authApi } from "@/api/auth";

import { QUERY_KEYS } from "../queries/queryKey";

import { SignupFormSchema } from "./useSignupForm";

/**
 * 회원가입 Mutation Hook (HttpOnly 쿠키 기반)
 *
 * 백엔드가 HttpOnly + Secure 쿠키로 토큰을 자동 설정하므로
 * 프론트엔드에서 토큰을 직접 저장할 필요가 없습니다.
 */
export function useSignupMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: SignupFormSchema) => {
      const { name, email, password } = payload; // confirmPassword, emailCheckPassed 제외
      return authApi.signup({ name, email, password });
    },
    onSuccess: () => {
      // 백엔드가 HttpOnly 쿠키로 토큰을 자동 설정
      // 사용자 정보 캐시 갱신
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.users.my() });
    },
  });
}
