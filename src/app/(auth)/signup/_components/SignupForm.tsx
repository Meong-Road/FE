// SignupForm.tsx
"use client";

import { Toaster } from "@/components/ui/sonner";

import { Form } from "../../../../components/Form";
import { SignupFormSchema, useSignupForm } from "../_hooks/useSignupForm";
import { useSignupMutation } from "../_hooks/useSignupMutation";

export default function SignupForm() {
  const form = useSignupForm();
  const { signupMutate, isPending } = useSignupMutation();

  const handleSubmit = (data: SignupFormSchema) => {
    signupMutate(data);
  };

  return (
    <>
      <Toaster richColors closeButton position="top-center" />
      <Form form={form} onSubmit={handleSubmit}>
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
              <div className="flex flex-1 items-center justify-between gap-2">
                <Form.Control>
                  <Form.Input
                    type="email"
                    placeholder="이메일을 입력하세요."
                    className="min-w-0 flex-1"
                    {...field}
                  />
                </Form.Control>
                <Form.EmailDuplicateCheckButton
                  form={form}
                  field="email"
                  errorMessage="이미 사용 중인 이메일입니다."
                />
              </div>
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
                  autoComplete="new-password"
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
                  autoComplete="new-password"
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
          label="회원가입"
        />

        {/* 소셜 로그인 버튼 */}
        <Form.SocialButtons />

        {/* 로그인 링크 */}
        <Form.LoginLink />
      </Form>
    </>
  );
}
