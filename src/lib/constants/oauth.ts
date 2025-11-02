/**
 * OAuth 소셜 로그인 설정
 *
 * Google, Kakao OAuth 2.0 인증에 필요한 클라이언트 정보와 URL을 관리합니다.
 */

// OAuth Provider별 설정
export const OAUTH_CONFIG = {
  google: {
    clientId:
      "751223624176-f8em08iqm0gehe9njm57qd5ruknsrn6i.apps.googleusercontent.com",
    authUrl: "https://accounts.google.com/o/oauth2/v2/auth",
    scope: "openid profile email",
  },
  kakao: {
    clientId: "676f3fb1108cfd0ac7b410f4a596a264",
    authUrl: "https://kauth.kakao.com/oauth/authorize",
    scope: "profile_nickname account_email",
  },
} as const;

/**
 * 현재 환경의 OAuth 콜백 URL 생성
 *
 * @returns 절대 경로 OAuth 콜백 URL
 */
export function getOAuthCallbackUrl(): string {
  if (typeof window === "undefined") {
    // 서버 사이드에서는 환경 변수 사용
    return `${process.env.NEXT_PUBLIC_SITE_URL}/signin/callback`;
  }

  // 클라이언트 사이드에서는 현재 origin 사용
  return `${window.location.origin}/signin/callback`;
}

/**
 * OAuth 인증 URL 생성 함수
 *
 * @param provider - 소셜 로그인 제공자 (google | kakao)
 * @param redirectUri - 인증 완료 후 리다이렉트될 프론트엔드 URL
 * @param state - CSRF 방지용 상태값 (선택)
 * @returns OAuth 인증 URL
 */
export function getOAuthUrl(
  provider: "google" | "kakao",
  redirectUri: string,
  state?: string,
): string {
  const config = OAUTH_CONFIG[provider];
  const params = new URLSearchParams({
    client_id: config.clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: config.scope,
    ...(state && { state }),
  });

  return `${config.authUrl}?${params.toString()}`;
}
