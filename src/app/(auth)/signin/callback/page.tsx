"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

import { useSocialLoginMutation } from "@/hooks/auth/useSocialLoginMutation";
import { PATH } from "@/lib/constants/path";
import { usePetInfoModalStore } from "@/store/modalStore";

/**
 * OAuth 소셜 로그인 콜백 페이지
 *
 * 소셜 제공자(Google/Kakao)가 인증 후 리다이렉트하는 페이지입니다.
 *
 * Flow:
 * 1. URL에서 인증 코드(code) 추출
 * 2. 백엔드 API에 코드 전송 (POST /auth/{platform})
 * 3. 백엔드가 토큰과 사용자 정보 반환
 * 4. 토큰 저장 및 적절한 페이지로 리다이렉트
 *
 * Query Parameters:
 * - code: OAuth 인증 코드 (필수)
 * - state: CSRF 방지 상태값 (provider, redirect 정보 포함)
 * - error: 에러 코드 (인증 실패 시)
 * - error_description: 에러 설명
 */
function OAuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setModalData, openModal } = usePetInfoModalStore();
  const { mutate: socialLogin } = useSocialLoginMutation();
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // 중복 실행 방지
    if (isProcessing) return;

    const code = searchParams.get("code");
    const state = searchParams.get("state");
    const error = searchParams.get("error");
    const errorDescription = searchParams.get("error_description");

    // 에러가 있는 경우
    if (error) {
      toast.error(`소셜 로그인 실패: ${errorDescription || error}`);
      router.replace(PATH.SIGNIN);
      return;
    }

    // 인증 코드가 없는 경우
    if (!code) {
      toast.error("인증 코드를 받지 못했습니다.");
      router.replace(PATH.SIGNIN);
      return;
    }

    // state 파싱 (provider와 redirect 정보 추출)
    let provider: "google" | "kakao" = "google";
    let redirectUrl: string | null = null;

    if (state) {
      try {
        const stateData = JSON.parse(decodeURIComponent(state));
        provider = stateData.provider || "google";
        redirectUrl = stateData.redirect || null;
      } catch (e) {
        console.warn("Failed to parse state:", e);
      }
    }

    setIsProcessing(true);

    // OAuth 콜백 URL 생성 (백엔드에 전달할 redirectUri)
    const callbackUrl =
      typeof window !== "undefined"
        ? `${window.location.origin}/signin/callback`
        : "/signin/callback";

    // 백엔드 API에 인증 코드 전송
    socialLogin(
      { provider, code, redirectUri: callbackUrl },
      {
        onSuccess: (res) => {
          toast.success("로그인에 성공했습니다.");

          // 펫 정보 미제출 시 모달 표시
          if (!res.result.isPetInfoSubmitted) {
            setModalData("first-login");
            openModal();
            return;
          }

          // 리다이렉트 URL이 있으면 해당 페이지로, 없으면 기본 페이지로
          router.replace(redirectUrl || PATH.REGULAR);
        },
        onError: (error: Error) => {
          toast.error(`소셜 로그인 실패: ${error.message}`);
          router.replace(PATH.SIGNIN);
        },
      },
    );
  }, [
    searchParams,
    router,
    setModalData,
    openModal,
    socialLogin,
    isProcessing,
  ]);

  // 로딩 화면
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500" />
        <p className="text-gray-600">로그인 처리 중...</p>
      </div>
    </div>
  );
}

export default function OAuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500" />
            <p className="text-gray-600">로딩 중...</p>
          </div>
        </div>
      }
    >
      <OAuthCallbackContent />
    </Suspense>
  );
}
