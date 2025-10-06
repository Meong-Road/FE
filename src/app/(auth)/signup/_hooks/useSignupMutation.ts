// hooks/useSignupMutation.ts
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { authApi } from "@/app/(auth)/signup/_api/signup";

import { SignupFormSchema } from "./useSignupForm";

export function useSignupMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: SignupFormSchema) => {
      // confirmPassword와 체크 필드 제외하고 전송
      const { confirmPassword, emailCheckPassed, ...signupData } = payload;
      return authApi.signup(signupData);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["signup"] });
      toast.success("회원가입 성공");

      // 토큰 저장
      if (data.result?.token) {
        localStorage.setItem("accessToken", data.result.token);
      }

      console.log("회원가입 성공", data);
    },
    onError: (error: unknown) => {
      toast.error("회원가입 실패");
      console.error(error);
    },
  });
}
