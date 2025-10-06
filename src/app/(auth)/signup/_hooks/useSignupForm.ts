// hooks/useSignupForm.ts
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// 스키마 정의
const formSchema = z
  .object({
    name: z
      .string()
      .min(1, "이름을 입력하세요.")
      .max(50, "이름은 50자 이하여야 합니다.")
      .regex(/^[가-힣a-zA-Z\s]+$/, "이름은 한글, 영문만 입력 가능합니다."),
    email: z
      .string()
      .min(1, "이메일을 입력해주세요.")
      .max(50, "이메일은 50자 이하여야 합니다.")
      .email("유효한 이메일을 입력해주세요."),
    nickName: z
      .string()
      .min(2, "닉네임은 2자 이상이어야 합니다.")
      .max(20, "닉네임은 20자 이하여야 합니다.")
      .regex(
        /^[가-힣a-zA-Z0-9]+$/,
        "닉네임은 한글, 영문, 숫자만 입력 가능합니다.",
      ),
    password: z
      .string()
      .min(8, "비밀번호는 8자 이상이어야 합니다.")
      .max(50, "비밀번호는 50자 이하여야 합니다.")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        "비밀번호는 영문 대소문자, 숫자, 특수문자를 포함해야 합니다.",
      ),
    confirmPassword: z
      .string()
      .min(8, "비밀번호는 8자 이상이어야 합니다.")
      .max(50, "비밀번호는 50자 이하여야 합니다."),
    emailCheckPassed: z.boolean().refine((val) => val === true, {
      message: "이메일 중복 확인이 필요합니다.",
    }),
    nicknameCheckPassed: z.boolean().refine((val) => val === true, {
      message: "닉네임 중복 확인이 필요합니다.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

export type SignupFormSchema = z.infer<typeof formSchema>;

export function useSignupForm() {
  return useForm<SignupFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      nickName: "",
      password: "",
      confirmPassword: "",
      emailCheckPassed: false,
      nicknameCheckPassed: false,
    },
    mode: "onChange",
  });
}
