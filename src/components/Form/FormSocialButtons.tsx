"use client";

import { useSearchParams } from "next/navigation";

import GoogleIcon from "@/assets/icons/google-icon.svg";
import KakaoIcon from "@/assets/icons/kakao-icon.svg";
import { getOAuthCallbackUrl, getOAuthUrl } from "@/lib/constants/oauth";
import { cn } from "@/lib/utils";

function GoogleIconSvg({
  width,
  className,
}: {
  width: number;
  className?: string;
}) {
  return <GoogleIcon width={width} height={width} className={className} />;
}

function KakaoIconSvg({
  width,
  className,
}: {
  width: number;
  className?: string;
}) {
  return <KakaoIcon width={width} height={width} className={className} />;
}

export function SocialButtons({
  className,
  ...props
}: React.ComponentProps<"button">) {
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect");

  /**
   * OAuth 로그인 핸들러 (프론트엔드 주도 방식)
   *
   * Flow:
   * 1. 프론트엔드 → Google/Kakao OAuth 인증 페이지로 직접 리다이렉트
   *    (redirect_uri는 프론트엔드 콜백 URL: /auth/callback)
   * 2. 사용자 로그인 및 권한 승인
   * 3. Google/Kakao → 프론트엔드 콜백 (/auth/callback?code=xxx)
   * 4. 프론트엔드가 인증 코드(code) 추출
   * 5. 프론트엔드 → 백엔드 API (GET /auth/{platform}?code=xxx&redirectUri=xxx)
   * 6. 백엔드가 토큰과 사용자 정보 반환
   * 7. 프론트엔드가 토큰 저장 및 메인 페이지로 이동
   *
   * @param provider - 소셜 로그인 제공자
   */
  const handleOAuthLogin = (provider: "google" | "kakao") => {
    // 프론트엔드 콜백 URL (Google/Kakao가 여기로 code를 보냄)
    const callbackUrl = getOAuthCallbackUrl();

    // state에 provider와 redirect 정보 포함 (CSRF 방지 + 추가 정보 전달)
    const state = JSON.stringify({
      provider,
      redirect: redirectUrl,
    });

    const oauthUrl = getOAuthUrl(provider, callbackUrl, state);

    // OAuth 인증 페이지로 리다이렉트
    window.location.href = oauthUrl;
  };

  return (
    <>
      {/* 구분선 - 반응형 패딩 조정 */}
      <div className="flex w-full items-center pt-4">
        <div className="flex-1 border-t border-gray-300" />
        <p className="px-2 text-xs font-medium text-gray-500 select-none md:px-3 md:text-sm">
          또는
        </p>
        <div className="flex-1 border-t border-gray-300" />
      </div>

      {/* 소셜 버튼들  */}
      <div className="flex w-full justify-center gap-4 p-2 md:gap-8">
        <button
          type="button"
          className={cn(
            "flex items-center justify-center rounded-full transition-colors",
            "h-14 w-14", //56px
            "bg-white hover:bg-gray-50 active:bg-gray-100",
            "border border-gray-200",
            className,
          )}
          onClick={() => handleOAuthLogin("google")}
          aria-label="Google 로그인"
          {...props}
        >
          <GoogleIconSvg width={28} className="md:h-8 md:w-8" />
        </button>

        <button
          type="button"
          className={cn(
            "flex items-center justify-center rounded-full transition-colors",
            "h-14 w-14", //56px
            "bg-yellow-300 hover:bg-yellow-400 active:bg-yellow-500",
            "border border-gray-200",
            className,
          )}
          onClick={() => handleOAuthLogin("kakao")}
          aria-label="Kakao 로그인"
          {...props}
        >
          <KakaoIconSvg width={28} className="md:h-8 md:w-8" />
        </button>
      </div>
    </>
  );
}
