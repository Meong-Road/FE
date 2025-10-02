"use client";

import { Form } from "../../signup/_components/Form";
import { SigninFormSchema, useSigninForm } from "../_hooks/useSigninForm";
import { useSigninMutation } from "../_hooks/useSigninMutation";

export default function SigninForm() {
  const form = useSigninForm();
  const { signinMutate, isPending } = useSigninMutation();

  const handleSubmit = (data: SigninFormSchema) => {
    signinMutate(data);
  };

  return (
    <>
      <Form form={form} onSubmit={handleSubmit}>
        <Form.Title>로그인</Form.Title>

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
                  placeholder="이메일을 입력해주세요"
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
                  placeholder="비밀번호를 입력해주세요"
                  autoComplete="current-password"
                  {...field}
                />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )}
        />

        {/* 로그인 버튼 */}
        <Form.SubmitButton
          isPending={isPending}
          isValid={form.formState.isValid}
          label="로그인"
        />

        {/* 소셜 로그인 버튼 */}
        <Form.SocialButtons />

        {/* 회원가입 링크 */}
        <Form.SignupLink />
      </Form>
    </>
  );
}
