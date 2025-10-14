"use client";

import { useMutation } from "@tanstack/react-query";

import { authApi } from "@/api/auth";

import { SigninFormSchema } from "./useSigninForm";

export function useSigninMutation() {
  return useMutation({
    mutationFn: async (payload: SigninFormSchema) => {
      return authApi.signin(payload);
    },
    onSuccess: (data) => {
      console.log("로그인 성공");
      const accessToken = data.result.accessToken;
      const refreshToken = data.result.refreshToken;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
    },
    onError: (error: unknown) => {
      console.log("로그인 실패: ", error);
    },
  });
}
