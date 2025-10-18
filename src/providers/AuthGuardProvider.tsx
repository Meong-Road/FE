// src/components/AuthGuard.tsx

"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import { useAuth } from "@/hooks/auth";
import { PATH, PROTECTED_ROUTES } from "@/lib/constants/path";

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
  const { user, isLoading } = useAuth();

  useEffect(() => {
    // 로딩 중이거나 인증이 필요하지 않은 경로면 무시
    if (isLoading || !isProtectedRoute(pathname)) {
      return;
    }

    // 인증되지 않은 경우 로그인 페이지로 리다이렉트
    if (!user) {
      const redirectUrl = `${PATH.SIGNIN}?redirect=${encodeURIComponent(pathname)}`;
      router.replace(redirectUrl);
    }
  }, [pathname, isLoading, user, router]);

  return <>{children}</>;
}
