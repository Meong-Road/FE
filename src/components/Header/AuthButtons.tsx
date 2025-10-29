"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { PATH } from "@/lib/constants/path";

export function AuthButtons() {
  const router = useRouter();

  return (
    <div className="flex items-center gap-1 text-[#8B8B8B]">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => router.push(PATH.SIGNIN)}
        className="cursor-pointer text-sm hover:bg-gray-300/10 hover:text-gray-500"
      >
        로그인
      </Button>
      <div className="h-2.5 w-px bg-gray-300" />
      <Button
        variant="ghost"
        size="sm"
        onClick={() => router.push(PATH.SIGNUP)}
        className="hover:bg-primary/10 hover:text-primary cursor-pointer text-sm"
      >
        회원가입
      </Button>
    </div>
  );
}
