// src/lib/auth/authGuard.ts

import { PATH } from "@/lib/constants/path";

/**
 * 인증이 필요한 경로 목록
 * 이 배열에 경로를 추가하면 자동으로 인증 체크가 적용됩니다.
 */
export const PROTECTED_ROUTES = [
  PATH.MY_PROFILE,
  PATH.FAVORITES,
  "/profile",
  "/quick/create",
  "/regular/create",
  "/reviews/create",
  // 필요에 따라 더 추가
] as const;

/**
 * 특정 경로가 인증이 필요한지 확인
 */
export function isProtectedRoute(pathname: string): boolean {
  return PROTECTED_ROUTES.some((route) => pathname.startsWith(route));
}

/**
 * 인증이 필요한 경로에 접근할 때 리다이렉트할 경로
 */
export const AUTH_REDIRECT_PATH = PATH.SIGNIN;
