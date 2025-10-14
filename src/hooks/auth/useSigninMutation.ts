"use client";

import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { authApi } from "@/api/auth";

import { SigninFormSchema } from "./useSigninForm";

export function useSigninMutation() {
  const router = useRouter();
  const queryClient = useQueryClient();

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

      queryClient.invalidateQueries({ queryKey: ["me"] });

      router.push("/regular");
    },
    onError: (error: unknown) => {
      console.log("로그인 실패: ", error);
    },
  });
}
