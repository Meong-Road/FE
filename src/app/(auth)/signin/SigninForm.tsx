"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

import { Form } from "@/components/Form";
import { SigninFormSchema, useSigninForm } from "@/hooks/auth/useSigninForm";
import { useSigninMutation } from "@/hooks/auth/useSigninMutation";
import { PATH } from "@/lib/constants/path";
import { usePetInfoModalStore } from "@/store/modalStore";

export default function SigninForm() {
  const form = useSigninForm();
  const { mutate: signinMutate, isPending } = useSigninMutation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect");

  const { setModalData, openModal } = usePetInfoModalStore();

  const handleSubmit = (data: SigninFormSchema) => {
    signinMutate(data, {
      onSuccess: (res) => {
        toast.success("로그인에 성공했습니다.");

        if (res.success && !res.result.user.isPetInfoSubmitted) {
          setModalData("first-login");
          openModal();
          return;
        }

        // 리다이렉트 URL이 있으면 해당 페이지로, 없으면 기본 페이지로
        router.push(redirectUrl || PATH.REGULAR);
      },
      onError: (error: Error) => {
        toast.error(`로그인 실패: ${error.message}`);
      },
    });
  };

  return (
    <>
      <Form
        form={form}
        onSubmit={handleSubmit}
        className="max-w-lg rounded-4xl"
      >
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
          disabled={!form.formState.isValid || isPending}
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
