"use client";

import Link from "next/link";

export function LoginLink() {
  return (
    <div className="flex items-center justify-center gap-1 pt-2 select-none md:pt-4">
      <span className="text-font-inactive text-xs md:text-sm">
        이미 회원이신가요?
      </span>
      <Link
        href="/signin"
        className="text-primary text-xs font-medium underline underline-offset-2 transition-colors hover:opacity-80 md:text-sm"
      >
        로그인
      </Link>
    </div>
  );
}
