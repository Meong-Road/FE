"use client";

import { MouseEvent } from "react";
import { useQueryClient } from "@tanstack/react-query";

import LikeBtn from "@/assets/icons/like-btn.svg";
import LikeBtnFilled from "@/assets/icons/like-btn-filled.svg";
import {
  useCancelLike,
  useGetIsLiked,
  useLike,
} from "@/hooks/queries/gatherings";
import { GatheringType } from "@/lib/types/gatherings";
import { cn } from "@/lib/utils";

export interface GatheringCardLikeBtnProps {
  className?: string;
  id: GatheringType["id"];
}

export function GatheringCardLikeBtn({
  className,
  id,
}: GatheringCardLikeBtnProps) {
  const queryClient = useQueryClient();
  const { data, isPending, isError } = useGetIsLiked({
    id,
  });
  const { mutate: like } = useLike({
    id,
  });
  const { mutate: cancelLike } = useCancelLike({
    id,
  });

  if (isPending)
    return (
      <div className={cn("h-8 w-8 rounded-full bg-slate-50", className)}></div>
    );
  if (isError)
    return (
      <div className={cn("h-8 w-8 rounded-full bg-slate-50", className)}>
        오류
      </div>
    );

  const isLiked = data.result?.isLiked;

  const handleLikeButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    // TODO
    if (isLiked) cancelLike();
    else like();
  };

  return (
    <button className={className} onClick={handleLikeButtonClick}>
      {isLiked ? (
        <LikeBtnFilled width={48} height={48} />
      ) : (
        <LikeBtn width={48} height={48} />
      )}
    </button>
  );
}
