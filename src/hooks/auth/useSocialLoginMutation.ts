import { useMutation, useQueryClient } from "@tanstack/react-query";

import { authApi } from "@/api/auth";
import { PostSocialLoginReq, PostSocialLoginRes } from "@/api/types/auth";

import { QUERY_KEYS } from "../queries/queryKey";

/**
 * OAuth 소셜 로그인 Mutation Hook (HttpOnly 쿠키 기반)
 *
 * 소셜 제공자로부터 받은 인증 코드를 백엔드로 전송하여 로그인을 처리합니다.
 *
 * Flow:
 * 1. 프론트엔드가 Google/Kakao에서 받은 인증 코드(code)를 전달받음
 * 2. 백엔드 API에 코드 전송 (POST /auth/{platform})
 * 3. 백엔드가 소셜 제공자와 통신하여 사용자 정보 획득
 * 4. 백엔드가 HttpOnly + Secure 쿠키로 토큰 자동 설정
 * 5. 프론트엔드는 사용자 정보만 받아서 처리
 *
 * @example
 * ```tsx
 * const { mutate: socialLogin, isPending } = useSocialLoginMutation();
 *
 * socialLogin(
 *   { provider: 'google', code: 'auth_code_from_google' },
 *   {
 *     onSuccess: (data) => {
 *       console.log('로그인 성공:', data.result.user);
 *       router.push('/');
 *     },
 *     onError: (error) => {
 *       console.error('로그인 실패:', error.message);
 *     }
 *   }
 * );
 * ```
 */
export function useSocialLoginMutation() {
  const queryClient = useQueryClient();
  return useMutation<PostSocialLoginRes, Error, PostSocialLoginReq>({
    mutationFn: (payload: PostSocialLoginReq) => {
      return authApi.socialLogin(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.users.my() });
    },
  });
}
