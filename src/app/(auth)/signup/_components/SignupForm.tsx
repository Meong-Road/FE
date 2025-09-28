"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";

import { authApi } from "@/app/(auth)/signup/_api/signup";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/sonner";

// ===================== 회원가입 폼 스키마 Validate =====================
const formSchema = z
  .object({
    name: z
      .string()
      .min(1, "이름을 입력하세요.")
      .max(50, "이름은 50자 이하여야 합니다.")
      .regex(/^[가-힣a-zA-Z\s]+$/, "이름은 한글, 영문만 입력 가능합니다."),
    email: z
      .email("유효한 이메일을 입력해주세요.")
      .min(1, "이메일을 입력해주세요.")
      .max(50, "이메일은 50자 이하여야 합니다."),
    password: z
      .string()
      .min(8, "비밀번호는 8자 이상이어야 합니다.")
      .max(50, "비밀번호는 50자 이하여야 합니다."),
    confirmPassword: z
      .string()
      .min(8, "비밀번호는 8자 이상이어야 합니다.")
      .max(50, "비밀번호는 50자 이하여야 합니다."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

// ===================== 회원가입 폼 스키마 타입 =====================
type SignupFormSchema = z.infer<typeof formSchema>;

// ===================== 회원가입 폼 컴포넌트 =====================
export default function SignupForm() {
  // 1. form 초기화 (react-hook-form)
  const form = useForm<SignupFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onSubmit",
  });

  // 2. 회원가입 요청 뮤테이션 (useMutation)
  const queryClient = useQueryClient();
  const signupMutation = useMutation({
    mutationFn: authApi.signup,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["signup"] });
      toast.success("회원가입 성공");
      console.log("회원가입 성공");
      console.log(data);
    },
  });

  // 3. 폼 제출 핸들러
  function handleSubmit(payload: SignupFormSchema): void {
    console.log(payload);
    signupMutation.mutate(payload);
  }

  // 4. 폼 렌더링
  return (
    <>
      <Toaster richColors closeButton position="top-center" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          noValidate
          className="w-full max-w-sm space-y-4 rounded-md border border-gray-300 p-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>이름</FormLabel>
                <FormControl>
                  <Input
                    placeholder="이름을 입력하세요."
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 이메일 */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>이메일</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="이메일을 입력하세요."
                    {...field}
                    value={field.value ?? ""}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 비밀번호 */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>비밀번호</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="비밀번호를 입력하세요."
                    {...field}
                    value={field.value ?? ""}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 비밀번호 확인 */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>비밀번호 확인</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="비밀번호를 입력하세요."
                    {...field}
                    value={field.value ?? ""}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="w-full"
            type="submit"
            disabled={signupMutation.isPending}
          >
            {signupMutation.isPending ? "처리중..." : "전송"}
          </Button>
        </form>
      </Form>
    </>
  );
}
