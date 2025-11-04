"use client";

import { Suspense, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
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
 * 2. 백엔드 API에 코드 전송 (GET /auth/{platform}?code=xxx&redirectUri=xxx)
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
  const {
    mutate: socialLoginMutation,
    isPending,
    isSuccess,
    isError,
  } = useSocialLoginMutation();
  const hasExecuted = useRef(false);

  useEffect(() => {
    console.log("🔄 useEffect 실행 - 상태:", {
      hasExecuted: hasExecuted.current,
      isPending,
      isSuccess,
      isError,
    });

    // 중복 실행 방지
    if (hasExecuted.current || isPending) {
      console.log("⏭️ 중복 실행 방지 또는 대기 중");
      return;
    }

    const code = decodeURIComponent(searchParams.get("code") || "");
    const state = decodeURIComponent(searchParams.get("state") || "");
    const error = searchParams.get("error");
    const errorDescription = searchParams.get("error_description");

    console.log("📋 URL 파라미터:", {
      code: code?.substring(0, 20) + "...",
      state,
      error,
    });

    // code가 없으면 실행하지 않음
    if (!code && !error) {
      console.log("⏭️ code와 error 모두 없음 - 실행 안 함");
      return;
    }

    // 에러가 있는 경우
    if (error) {
      hasExecuted.current = true;
      toast.error(`소셜 로그인 실패: ${errorDescription || error}`);
      router.replace(PATH.SIGNIN);
      return;
    }

    // 인증 코드가 없는 경우
    if (!code) {
      hasExecuted.current = true;
      toast.error("인증 코드를 받지 못했습니다.");
      router.replace(PATH.SIGNIN);
      return;
    }

    // state 파싱 (provider와 redirect 정보 추출)
    let provider: "google" | "kakao" = "google";
    let redirectUrl: string | null = null;

    if (state) {
      try {
        const stateData = JSON.parse(state);
        provider = stateData.provider || "google";
        redirectUrl = stateData.redirect || null;
      } catch (e) {
        console.warn("Failed to parse state:", e);
      }
    }

    // OAuth 콜백 URL (백엔드에 전달할 redirectUri - 처음에 사용한 것과 동일해야 함)
    // pathname만 사용 (쿼리 파라미터 제외)
    const callbackUrl =
      typeof window !== "undefined"
        ? `${window.location.origin}${window.location.pathname}`
        : "http://localhost:3000/signin/callback";

    console.log("🔍 OAuth Callback Debug:", {
      provider,
      code: code?.substring(0, 20) + "...",
      redirectUri: callbackUrl,
    });

    // 백엔드 API에 인증 코드와 redirectUri 전송
    console.log("🚀 Mutation 실행 시작");
    hasExecuted.current = true; // mutation 실행 직전에 플래그 설정

    try {
      socialLoginMutation(
        { provider, code, redirectUri: callbackUrl },
        {
          onSuccess: (res) => {
            console.log("✅ onSuccess 콜백 실행됨:", res);
            toast.success("로그인에 성공했습니다.");

            // 펫 정보 미제출 시 모달 표시
            if (!res.result.user.isPetInfoSubmitted) {
              console.log("📋 펫 정보 미제출 - 모달 표시");
              setModalData("first-login");
              openModal();
              return;
            }

            // 리다이렉트 URL이 있으면 해당 페이지로, 없으면 기본 페이지로
            const targetUrl = redirectUrl || PATH.REGULAR;
            console.log("🔄 리다이렉트:", targetUrl);
            router.replace(targetUrl);
          },
          onError: (error: Error) => {
            console.error("❌ onError 콜백 실행됨:", error);
            toast.error(`로그인 실패: ${error.message}`);
            hasExecuted.current = false; // 실패 시 재시도 가능하도록
            router.replace(PATH.SIGNIN);
          },
          onSettled: () => {
            console.log(
              "🏁 onSettled 콜백 실행됨 (성공/실패 관계없이 항상 실행)",
            );
          },
        },
      );
      console.log("✅ Mutation 호출 완료 (동기 부분)");
    } catch (err) {
      console.error("💥 Mutation 호출 중 동기 에러:", err);
      hasExecuted.current = false;
    }
  }, [
    searchParams,
    router,
    setModalData,
    openModal,
    socialLoginMutation,
    isPending,
    isSuccess,
    isError,
  ]);

  // 로딩 화면
  return (
    <div className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm duration-300">
      <div className="space-y-4 text-center">
        <div className="relative">
          <Loader2 className="text-primary-500 mx-auto h-12 w-12 animate-spin" />
          <div className="absolute inset-0 mx-auto h-12 w-12 animate-ping opacity-20">
            <Loader2 className="text-primary-500 h-full w-full" />
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-lg font-semibold text-gray-900">로그인 처리 중</p>
          <p className="text-sm text-gray-500">잠시만 기다려주세요...</p>
        </div>
      </div>
    </div>
  );
}

export default function OAuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm duration-300">
          <div className="space-y-4 text-center">
            <div className="relative">
              <Loader2 className="text-primary-500 mx-auto h-12 w-12 animate-spin" />
              <div className="absolute inset-0 mx-auto h-12 w-12 animate-ping opacity-20">
                <Loader2 className="text-primary-500 h-full w-full" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-lg font-semibold text-gray-900">로딩 중</p>
              <p className="text-sm text-gray-500">잠시만 기다려주세요...</p>
            </div>
          </div>
        </div>
      }
    >
      <OAuthCallbackContent />
    </Suspense>
  );
}
