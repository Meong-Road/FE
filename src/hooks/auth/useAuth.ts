// src/hooks/auth/useAuth.ts
import { useGetMyInfo } from "@/hooks/queries/user";

/**
 * 전역 인증 상태 훅 (HttpOnly 쿠키 기반)
 *
 * - HttpOnly + Secure 쿠키로 인증 관리
 * - 백엔드가 자동으로 쿠키 설정/검증
 * - 프론트엔드는 /user/my API 호출로 인증 상태 확인
 *
 * @returns 사용자 정보 및 로딩 상태
 */
export function useAuth() {
  // 쿠키 기반 인증: 항상 사용자 정보 조회 시도
  // 쿠키가 없으면 백엔드가 401 에러 반환
  const { data: user, ...props } = useGetMyInfo();

  return { user, ...props };
}
