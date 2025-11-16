import { useQuery } from "@tanstack/react-query";

import { userApi } from "@/api/user";
import { ApiError } from "@/lib/api/customFetch";

import { QUERY_KEYS } from "../queryKey";

/**
 * 현재 로그인한 사용자 정보 조회 훅 (HttpOnly 쿠키 기반)
 *
 * @description
 * - 401/400 에러 시 null 반환 (에러 로깅 없음)
 * - customFetch에서 자동으로 refresh 시도
 * - 캐시 무제한 유지 (staleTime/gcTime: Infinity)
 *
 * @returns user: 사용자 정보 | null
 */
export const useGetMyInfo = ({
  enabled = true,
}: {
  enabled?: boolean;
} = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.users.my(),
    queryFn: async () => {
      try {
        return await userApi.getMyInfo();
      } catch (error) {
        // 인증 관련 에러는 조용히 처리 (로그인하지 않은 상태)
        if (
          error instanceof ApiError &&
          [401, 400].includes(error.statusCode)
        ) {
          return null;
        }
        // 다른 에러는 그대로 전파
        throw error;
      }
    },
    select: (data) => data?.result ?? null,
    staleTime: Infinity, // 데이터 항상 신선함 (캐시 무제한)
    gcTime: Infinity, // 가비지 컬렉션 비활성화 (캐시 영구 유지)
    enabled,
    retry: false, // 에러 시 재시도 안 함 (이미 queryFn에서 처리)
  });
};
