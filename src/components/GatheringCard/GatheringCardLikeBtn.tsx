"use client";

import { MouseEvent } from "react";
import { useRouter } from "next/navigation";

import LikeBtn from "@/assets/icons/like-btn.svg";
import LikeBtnFilled from "@/assets/icons/like-btn-filled.svg";
import { useAuth } from "@/hooks/auth";
import {
  useCancelLike,
  useGetIsLiked,
  useLike,
} from "@/hooks/queries/gatherings";
import { PATH } from "@/lib/constants/path";
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
  const router = useRouter();
  const { user, isLoading } = useAuth();

  // 유저가 없거나 로딩 중이면 쿼리 실행 안 함
  const { data, isPending, isError } = useGetIsLiked({
    id,
    enabled: !!user && !isLoading,
  });

  const { mutate: like } = useLike({ id });
  const { mutate: cancelLike } = useCancelLike({ id });

  // 🔹 1️⃣ 로딩 중
  if (isLoading) return <LikeBtn width={48} height={48} />;

  // 🔹 2️⃣ 비회원 (로그인 필요)
  if (!user)
    return (
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          router.push(PATH.SIGNIN);
        }}
        className={className}
      >
        <LikeBtn width={48} height={48} />
      </button>
    );

  // 🔹 3️⃣ 쿼리 로딩 중
  if (isPending)
    return (
      <div className={cn("h-12 w-12 rounded-full bg-slate-50", className)} />
    );

  // 🔹 4️⃣ 쿼리 에러
  if (isError)
    return (
      <div className={cn("h-12 w-12 rounded-full bg-slate-50", className)}>
        오류
      </div>
    );

  // 🔹 5️⃣ 정상 상태
  const isLiked = data?.isLiked;

  const handleLikeButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
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
