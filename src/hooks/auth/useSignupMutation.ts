// hooks/useSignupMutation.ts
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { authApi } from "@/api/auth";

import { SignupFormSchema } from "./useSignupForm";

export function useSignupMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: SignupFormSchema) => {
      // 비밀번호 확인이랑 이메일 체크 필드 제외하고 전송
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { confirmPassword, emailCheckPassed, ...signupData } = payload;
      return authApi.signup(signupData);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["signup"] });
      toast.success("회원가입 성공");

      // // 액세스 토큰 저장(리프레시는 어디있지?)
      // if (data.result?.token) {
      //   localStorage.setItem("accessToken", data.result.token);
      // }

      // 테스트용 로그
      console.log("회원가입 성공", data);
      console.log("유저 데이터", data.result.user);
    },
    onError: (error: unknown) => {
      toast.error("회원가입 실패");
      console.error(error);
    },
  });
}
