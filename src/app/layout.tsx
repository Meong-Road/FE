import type { Metadata } from "next";
import localFont from "next/font/local";
import { Toaster } from "sonner";

import Header from "@/components/Header";
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
};

initMocks();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${pretendardVariable.className}`}>
        <QueryProvider>
          <MSWProvider>
            <AuthGuardProvider>
              <Header />
              <div className="relative mx-auto max-w-[1280px] min-w-0 scroll-pt-32 px-4 pt-26 pb-8 md:px-8 md:pt-32">
                {children}
              </div>
            </AuthGuardProvider>
            <div id="modal-root"></div>
            <Toaster />
          </MSWProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
