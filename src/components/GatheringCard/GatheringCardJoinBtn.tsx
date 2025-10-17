"use client";

import { MouseEvent } from "react";
import { useRouter } from "next/navigation";

import { useAuthUser } from "@/hooks/auth/useAuthUser";
import { PATH } from "@/lib/constants/path";
import { cn } from "@/lib/utils";

interface GatheringCardJoinBtnProps {
  className?: string;
}

export function GatheringCardJoinBtn({ className }: GatheringCardJoinBtnProps) {
  const router = useRouter();
  const { data: user } = useAuthUser();

  const handleParticipateButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      router.push(PATH.SIGNIN);
      return;
    }

    // TODO
    console.log("참여하기");
  };

  return (
    <button
      className={cn(
        "bg-primary flex h-9 w-36 items-center justify-center rounded-[10px] font-bold text-white",
        className,
      )}
      onClick={handleParticipateButtonClick}
    >
      참여하기
    </button>
  );
}
