// SignupForm.tsx
"use client";

import { Toaster } from "@/components/ui/sonner";

import { useSignupForm } from "../_hooks/useSignupForm";
import { useSignupMutation } from "../_hooks/useSignupMutation";

import { Form } from "./Form";

export default function SignupForm() {
  const form = useSignupForm();
  const { signupMutate, isPending } = useSignupMutation();

  return (
    <>
      <Toaster richColors closeButton position="top-center" />
      <Form form={form} onSubmit={signupMutate}>
        <Form.Title>회원가입</Form.Title>

        {/* 이름 */}
        <Form.Field
          control={form.control}
          name="name"
          render={({ field }) => (
            <Form.Item>
              <Form.Label>이름</Form.Label>
              <Form.Control>
                <Form.Input
                  placeholder="이름을 입력하세요."
                  type="text"
                  autoComplete="nope"
                  {...field}
                />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )}
        />

        {/* 이메일 */}
        <Form.Field
          control={form.control}
          name="email"
          render={({ field }) => (
            <Form.Item>
              <Form.Label>이메일</Form.Label>
              <Form.Control>
                <Form.Input
                  type="email"
                  placeholder="이메일을 입력하세요."
                  autoComplete="nope"
                  {...field}
                />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )}
        />

        {/* 비밀번호 */}
        <Form.Field
          control={form.control}
          name="password"
          render={({ field }) => (
            <Form.Item>
              <Form.Label>비밀번호</Form.Label>
              <Form.Control>
                <Form.Input
                  type="password"
                  placeholder="비밀번호를 입력하세요."
                  {...field}
                />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )}
        />

        {/* 비밀번호 확인 */}
        <Form.Field
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <Form.Item>
              <Form.Label>비밀번호 확인</Form.Label>
              <Form.Control>
                <Form.Input
                  type="password"
                  placeholder="비밀번호를 입력하세요."
                  {...field}
                />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )}
        />

        {/* 회원가입 버튼 */}
        <Form.SubmitButton
          isPending={isPending}
          isValid={form.formState.isValid}
        />

        {/* 소셜 로그인 버튼 */}
        <Form.SocialButtons />

        {/* 로그인 링크 */}
        <Form.LoginLink />
      </Form>
    </>
  );
}
