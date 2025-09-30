"use client";

import Link from "next/link";

export function LoginLink() {
  return (
    <div className="flex items-center justify-center gap-1 pt-2 md:pt-4">
      <span className="text-sm text-gray-600">이미 회원이신가요?</span>
      <Link
        href="/signin"
        className="text-sm font-medium text-orange-500 underline underline-offset-2 transition-colors hover:text-orange-600"
      >
        로그인
      </Link>
    </div>
  );
}
