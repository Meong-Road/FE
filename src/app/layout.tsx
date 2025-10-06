import type { Metadata } from "next";
import localFont from "next/font/local";

import { initMocks } from "@/mocks";
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
      <body
        className={`${pretendardVariable.className} bg-background antialiased`}
      >
        <QueryProvider>
          <MSWProvider>
            {children}
            <div id="modal-root"></div>
          </MSWProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
