"use client";

import { MouseEvent } from "react";

import LikeBtn from "@/assets/icons/like-btn.svg";
import LikeBtnFilled from "@/assets/icons/like-btn-filled.svg";
import { useAuth } from "@/hooks/auth";
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
  const { user, isLoading } = useAuth();

  const { data, isPending, isError } = useGetIsLiked({
    id,
    enabled: !!user,
  });
  const { mutate: like } = useLike({
    id,
  });
  const { mutate: cancelLike } = useCancelLike({
    id,
  });

  if (isLoading || !user) return null;

  if (isPending)
    return (
      <div
        className={cn("h-12 w-12 rounded-full bg-slate-50", className)}
      ></div>
    );
  if (isError)
    return (
      <div className={cn("h-12 w-12 rounded-full bg-slate-50", className)}>
        오류
      </div>
    );

  const isLiked = data?.isLiked;

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
