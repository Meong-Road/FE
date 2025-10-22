"use client";

import { MouseEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

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

import GatheringCardSkeleton from "./Skeleton/GatheringCardSkeleton";

interface GatheringCardLikeBtnProps {
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
    enabled: !!user,
  });

  const { mutate: like } = useLike({ id });
  const { mutate: cancelLike } = useCancelLike({ id });

  // 쿼리 로딩 중
  if (isLoading || (user && isPending))
    return <GatheringCardSkeleton.LikeBtn />;

  // 쿼리 에러
  if (user && (isError || !data))
    return <div className={cn("size-12 rounded-full", className)}>오류</div>;

  // 정상 상태
  const isLiked = data?.isLiked;

  const handleLikeButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      toast.info("로그인이 필요한 기능이예요");
      router.push(PATH.SIGNIN);
      return;
    }

    if (isLiked) cancelLike();
    else like();
  };

  return (
    <button
      className={cn(
        "cursor-pointer rounded-full bg-white hover:brightness-[.98]",
        className,
      )}
      onClick={handleLikeButtonClick}
    >
      {isLiked ? (
        <LikeBtnFilled width={48} height={48} />
      ) : (
        <LikeBtn width={48} height={48} />
      )}
    </button>
  );
}
