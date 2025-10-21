"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const signinFormSchema = z.object({
  email: z
    .email("유효한 이메일을 입력해주세요")
    .min(1, "이메일을 입력해주세요")
    .max(50, "이메일은 50자 이하여야 합니다"),
  password: z
    .string()
    .min(8, "비밀번호는 8자 이상이어야 합니다")
    .max(50, "비밀번호는 50자 이하여야 합니다"),
});

export type SigninFormSchema = z.infer<typeof signinFormSchema>;

export function useSigninForm() {
  return useForm<SigninFormSchema>({
    resolver: zodResolver(signinFormSchema),
    defaultValues: { email: "", password: "" },
    mode: "onChange",
  });
}
