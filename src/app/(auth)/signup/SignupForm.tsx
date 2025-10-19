// SignupForm.tsx
"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Form } from "@/components/Form";
import { SignupFormSchema, useSignupForm } from "@/hooks/auth/useSignupForm";
import { useSignupMutation } from "@/hooks/auth/useSignupMutation";
import { PATH } from "@/lib/constants/path";

export default function SignupForm() {
  const form = useSignupForm();
  const { mutate: signupMutate, isPending } = useSignupMutation();
  const router = useRouter();

  const handleSubmit = (data: SignupFormSchema) =>
    signupMutate(data, {
      onSuccess: () => {
        toast.success("회원가입에 성공했습니다.");
        router.push(PATH.REGULAR);
      },
      onError: (error: Error) => {
        toast.error(`회원가입 실패: ${error.message}`);
      },
    });

  return (
    <>
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
                  placeholder="이름을 입력해주세요"
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
              <div className="flex w-full items-center gap-2">
                <Form.Control className="min-w-0 flex-1">
                  <Form.Input
                    type="email"
                    placeholder="이메일을 입력해주세요"
                    {...field}
                  />
                </Form.Control>
                <Form.DuplicateCheckButton
                  form={form}
                  field="email"
                  type="email"
                  checkPassedField="emailCheckPassed"
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
                  placeholder="비밀번호를 입력해주세요"
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
                  placeholder="비밀번호를 한번 더 입력해주세요"
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
          disabled={isPending || !form.formState.isValid}
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
