"use client";

import { MouseEvent } from "react";
import { toast } from "sonner";

import LikeBtn from "@/assets/icons/like-btn.svg";
import LikeBtnFilled from "@/assets/icons/like-btn-filled.svg";
import { useGatheringStateContext } from "@/hooks/context/useGatheringStateContext";
import {
  useCancelLike,
  useGetIsLiked,
  useLike,
} from "@/hooks/queries/gatherings";
import { PATH } from "@/lib/constants/path";
import { cn } from "@/lib/utils";
import { checkIsClosedGatheringState } from "@/lib/utils/gathering";
import { useAuthRequiredModalStore } from "@/store/modalStore";

import GatheringCardSkeleton from "./Skeleton/GatheringCardSkeleton";

interface GatheringCardLikeBtnProps {
  className?: string;
}

export function GatheringCardLikeBtn({ className }: GatheringCardLikeBtnProps) {
  const { gathering, user, state } = useGatheringStateContext();
  const { openModal } = useAuthRequiredModalStore();

  const isClosedGathering = checkIsClosedGatheringState(state);

  // 유저가 없거나 로딩 중이면 쿼리 실행 안 함
  const { data, isPending, isError } = useGetIsLiked({
    id: gathering.id,
    enabled: !!user,
  });

  const { mutateAsync: like } = useLike({ id: gathering.id });
  const { mutateAsync: cancelLike } = useCancelLike({ id: gathering.id });

  if (user && isPending) return <GatheringCardSkeleton.LikeBtn />;
  if (user && (isError || !data))
    return <div className={cn("size-12 rounded-full", className)}>오류</div>;

  const isLiked = data?.isLiked;

  const handleLikeButtonClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      openModal(PATH.SIGNIN);
      return;
    }

    try {
      if (isLiked) await cancelLike();
      else await like();
      toast.success(
        `[${gathering.name}] 모임을 ${isLiked ? "찜 해제" : "찜"}했어요`,
      );
    } catch (error) {
      console.error(error);
      toast.error(
        `[${gathering.name}] 모임을 ${isLiked ? "찜 해제" : "찜"}하는 중 오류가 발생했어요`,
      );
    }
  };

  return (
    <button
      className={cn(
        "cursor-pointer rounded-full bg-white hover:brightness-[.98]",
        isClosedGathering && "grayscale-100",
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
