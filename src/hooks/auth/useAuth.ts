// src/hooks/auth/useAuth.ts

import { useGetMyInfo } from "@/hooks/queries/user";
import { tokenStorage } from "@/lib/utils/token";

/**
 * 전역 인증 상태 관리 훅
 * React Query 기반으로 구현되어 중복 API 호출 방지
 */
export function useAuth() {
  const { data: user, isLoading, error } = useGetMyInfo();
  const hasToken = !!tokenStorage.getAccess();
  const isAuthenticated = !!user && hasToken;

  return {
    user,
    isLoading,
    error,
    isAuthenticated,
    hasToken,
  };
}
