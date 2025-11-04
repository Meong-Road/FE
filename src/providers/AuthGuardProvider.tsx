// src/components/AuthGuard.tsx

"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

import { useAuth } from "@/hooks/auth";
import { PATH, PROTECTED_ROUTES } from "@/lib/constants/path";
import { useAuthRequiredModalStore } from "@/store/modalStore";

interface AuthGuardProviderProps {
  children: React.ReactNode;
}

/**
 * 특정 경로가 인증이 필요한지 확인
 */
function isProtectedRoute(pathname: string): boolean {
  return PROTECTED_ROUTES.some((route) => pathname.startsWith(route));
}

/**
 * 인증 가드 프로바이더
 * 자동으로 인증이 필요한 경로를 체크하고 리다이렉트
 * layout.tsx에서 사용하여 전역적으로 적용
 */
export default function AuthGuardProvider({
  children,
}: AuthGuardProviderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isPending } = useAuth();
  const { openModal } = useAuthRequiredModalStore();

  // 사용자 상태 안정화를 위한 ref
  const prevUserRef = useRef(user);
  const wasAuthenticatedRef = useRef(!!user);

  useEffect(() => {
    // 사용자 상태 변화 추적
    if (prevUserRef.current !== user) {
      // 인증 → 비인증으로 변경된 경우 (로그아웃)
      if (wasAuthenticatedRef.current && !user) {
        wasAuthenticatedRef.current = false;
      }
      // 비인증 → 인증으로 변경된 경우 (로그인)
      else if (!wasAuthenticatedRef.current && user) {
        wasAuthenticatedRef.current = true;
      }
      prevUserRef.current = user;
    }
  }, [user]);

  useEffect(() => {
    // 1. 로딩 중이면 대기
    if (isPending) {
      return;
    }

    // 2. 인증이 필요하지 않은 경로면 무시
    if (!isProtectedRoute(pathname)) {
      return;
    }

    // 3. 이전에 인증되어 있었는데 지금 user가 없다면 로그아웃 중
    // → 이 경우는 라우팅이 진행 중이므로 모달을 띄우지 않음
    if (wasAuthenticatedRef.current && !user) {
      return;
    }

    // 4. 처음부터 인증되지 않은 상태에서 보호된 경로 접근 → 모달 표시
    if (!user) {
      const redirectUrl = `${PATH.SIGNIN}?redirect=${encodeURIComponent(pathname)}`;
      openModal(redirectUrl, () => {
        router.back();
      });
    }
  }, [pathname, isPending, user, router, openModal]);

  return <>{children}</>;
}
