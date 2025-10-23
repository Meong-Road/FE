// src/hooks/auth/useAuth.ts
import { useGetMyInfo } from "@/hooks/queries/user";
import { tokenStorage } from "@/lib/utils/storage";

/**
 * 전역 인증 상태 훅
 * - 사용자 정보 조회 및 로딩 상태 반환
 */
export function useAuth() {
  // 나중에 쿠키로 관리하면
  // customFetch에 credentials: 'include' 추가하고, 토큰 체크 로직 삭제
  const hasToken = !!tokenStorage.getAccess();

  const { data: user, isLoading } = useGetMyInfo({
    enabled: hasToken, // 토큰이 있을 때만 사용자 정보 조회 -> 쿠키 전환시 삭제
  });

  return { user, isLoading };
}
