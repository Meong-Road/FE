"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Form } from "@/components/Form";
import { SigninFormSchema, useSigninForm } from "@/hooks/auth/useSigninForm";
import { useSigninMutation } from "@/hooks/auth/useSigninMutation";

export default function SigninForm() {
  const form = useSigninForm();
  const { mutate: signinMutate, isPending } = useSigninMutation();
  const router = useRouter();

  const handleSubmit = (data: SigninFormSchema) => {
    signinMutate(data, {
      onSuccess: () => {
        toast.success("로그인에 성공했습니다.");
        router.push("/regular");
      },
      onError: (error: Error) => {
        toast.error(`로그인에 실패했습니다. \n${error.message}`);
      },
    });
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
