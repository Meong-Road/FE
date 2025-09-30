// hooks/useSignupMutation.ts
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { authApi } from "@/app/(auth)/signup/_api/signup";

import { SignupFormSchema } from "./useSignupForm";

export function useSignupMutation() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: SignupFormSchema) => authApi.signup(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["signup"] });
      toast.success("회원가입 성공");
      console.log("회원가입 성공", data);
    },
    onError: (error: unknown) => {
      toast.error("회원가입 실패");
      console.error(error);
    },
  });

  const handleSignup = (payload: SignupFormSchema) => {
    mutate(payload);
  };

  return { handleSignup, isPending };
}
