import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import { Toaster } from "sonner";

import { Header } from "@/components/Header";
import { initMocks } from "@/mocks";
import AuthGuardProvider from "@/providers/AuthGuardProvider";
import MSWProvider from "@/providers/MSWProvider";
import QueryProvider from "@/providers/QueryProvider";

import "./globals.css";

const pretendardVariable = localFont({
  src: "../assets/fonts/PretendardVariable.woff2",
});

export const metadata: Metadata = {
  title: "멍로드",
  description: "멍로드에서 함개 걸어요!",
  icons: {
    icon: "./favicon.ico",
  },
};

initMocks();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <Script
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_KEY}&libraries=services&autoload=false`}
          strategy="beforeInteractive"
        />
      </head>
      <body className={`${pretendardVariable.className}`}>
        <MSWProvider>
          <QueryProvider>
            <AuthGuardProvider>
              <Header />
              <div className="relative mx-auto max-w-[1280px] min-w-0 scroll-pt-32 px-4 pt-26 pb-8 sm:px-8 sm:pt-32">
                {children}
              </div>
            </AuthGuardProvider>
            <div id="modal-root"></div>
            <Toaster />
          </QueryProvider>
        </MSWProvider>
      </body>
    </html>
  );
}
