"use client";

import { MouseEvent } from "react";

import { cn } from "@/lib/utils";

interface GatheringCardJoinBtnProps {
  className?: string;
}

export function GatheringCardJoinBtn({ className }: GatheringCardJoinBtnProps) {
  const handleParticipateButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
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
