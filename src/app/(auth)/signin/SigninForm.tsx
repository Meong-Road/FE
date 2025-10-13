"use client";

import { Form } from "@/components/Form";
import { SigninFormSchema, useSigninForm } from "@/hooks/auth/useSigninForm";
import { useSigninMutation } from "@/hooks/auth/useSigninMutation";
import { useSignout } from "@/hooks/auth/useSignout";

export default function SigninForm() {
  const form = useSigninForm();
  const { mutate: signinMutate, isPending } = useSigninMutation();

  const handleSubmit = (data: SigninFormSchema) => {
    signinMutate(data, {
      onSuccess: () => {
        form.reset();
      },
    });
  };

  // 로그아웃 테스트용
  const isLoggedIn =
    typeof window !== "undefined" && !!localStorage.getItem("accessToken");
  const signout = useSignout();

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

        {/* 로그아웃 테스트용 */}
        {isLoggedIn && (
          <div className="mt-4 flex justify-center">
            <button onClick={signout}>로그아웃</button>
          </div>
        )}
      </Form>
    </>
  );
}
