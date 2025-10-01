"use client";

import { useMutation } from "@tanstack/react-query";

import { SigninFormSchema } from "./useSigninForm";

export function useSigninMutation() {
  const { mutate, isPending } = useMutation({
    mutationFn: async (payload: SigninFormSchema) => {
      console.log("payload:", payload);
      return "temp";
    },
    onSuccess: () => {
      console.log("success");
    },
    onError: (error: unknown) => {
      console.log("error:", error);
    },
  });

  const handleSignin = (payload: SigninFormSchema) => {
    mutate(payload);
  };

  return { handleSignin, isPending };
}
