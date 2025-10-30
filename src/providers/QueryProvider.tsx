"use client";

import {
  isServer,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // SSR에서는 staleTime을 0보다 크게 설정하여
        // 클라이언트에서 즉시 리페칭되는 것을 방지
        staleTime: 60 * 1000, // 60초
      },
    },
  });
}

// 브라우저용 QueryClient (싱글톤)
let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (isServer) {
    // 서버: 항상 새로운 QueryClient 생성
    // 요청 간 데이터 공유 방지
    return makeQueryClient();
  } else {
    // 브라우저: 기존 QueryClient 재사용
    // React가 suspense 중 클라이언트를 재생성하지 않도록 중요!
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

export default function QueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
