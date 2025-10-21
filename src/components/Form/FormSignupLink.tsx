"use client";

import Link from "next/link";

import { PATH } from "@/lib/constants/path";

export function SignupLink() {
  return (
    <div className="flex items-center justify-center gap-1 pt-2 md:pt-4">
      <span className="text-sm text-gray-600">멍로드가 처음이신가요?</span>
      <Link
        href={PATH.SIGNUP}
        className="text-sm font-medium text-orange-500 underline underline-offset-2 transition-colors hover:text-orange-600"
      >
        회원가입
      </Link>
    </div>
  );
}
