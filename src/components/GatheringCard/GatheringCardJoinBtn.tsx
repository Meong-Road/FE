"use client";

import { MouseEvent } from "react";
import { VariantProps } from "class-variance-authority";
import { toast } from "sonner";

import { useAuth } from "@/hooks/auth";
import {
  useCancelJoinGathering,
  useJoinGathering,
} from "@/hooks/queries/gatherings";
import { useGetIsParticipating } from "@/hooks/queries/gatherings/useGetIsParticipating";
import { PATH } from "@/lib/constants/path";
import { GatheringType } from "@/lib/types/gatherings";
import { useAuthRequiredModalStore } from "@/store/modalStore";

import { Button, buttonVariants } from "../ui/button";

import GatheringCardSkeleton from "./Skeleton/GatheringCardSkeleton";

enum EButtonType {
  JOIN = "join",
  CANCEL = "cancel",
}

const SUCCESS_MESSAGE: Record<EButtonType, string> = {
  [EButtonType.JOIN]: "모임에 참여했어요",
  [EButtonType.CANCEL]: "모임에 참여 취소했어요",
};

const ERROR_MESSAGE: Record<EButtonType, string> = {
  [EButtonType.JOIN]: "모임 참여 중 오류가 발생했어요",
  [EButtonType.CANCEL]: "모임 참여 취소 중 오류가 발생했어요",
};

const BUTTON_VARIANT: Record<
  EButtonType,
  VariantProps<typeof buttonVariants>["variant"]
> = {
  [EButtonType.JOIN]: "default",
  [EButtonType.CANCEL]: "outline",
};

interface GatheringCardJoinBtnProps {
  gathering: GatheringType;
  isInvalid?: boolean;
}

export function GatheringCardJoinBtn({
  gathering,
  isInvalid = false,
}: GatheringCardJoinBtnProps) {
  const { user, isLoading } = useAuth();
  const { openModal } = useAuthRequiredModalStore();

  // 유저가 없거나 로딩 중이면 쿼리 실행 안 함
  const { data, isPending, isError } = useGetIsParticipating({
    id: gathering.id,
    enabled: !isInvalid && !!user && !isLoading,
  });

  const { mutateAsync: join, isPending: isJoinPending } = useJoinGathering();
  const { mutateAsync: cancelJoin, isPending: isCancelPending } =
    useCancelJoinGathering();

  if (isInvalid)
    return (
      <Button
        className="cursor-not-allowed"
        size="xl"
        variant="gray"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        모집종료
      </Button>
    );
  if (user && isPending) return <GatheringCardSkeleton.JoinBtn />;
  if (user && (isError || !data))
    return (
      <div className="flex h-11 w-30 items-center justify-center rounded-[10px] bg-slate-50">
        에러
      </div>
    );

  const mode = data?.isParticipated ? EButtonType.CANCEL : EButtonType.JOIN;
  const isMutationPending = isJoinPending || isCancelPending;

  const handleButtonClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      openModal(PATH.SIGNIN);
      return;
    }

    try {
      if (mode === EButtonType.CANCEL) await cancelJoin({ id: gathering.id });
      else await join({ id: gathering.id });
      toast.success(`[${gathering.name}] ${SUCCESS_MESSAGE[mode]}`);
    } catch (error) {
      console.error(error);
      toast.error(`[${gathering.name}] ${ERROR_MESSAGE[mode]}`);
    }
  };

  return (
    <Button
      size="xl"
      variant={BUTTON_VARIANT[mode]}
      onClick={handleButtonClick}
      disabled={isLoading || isMutationPending}
    >
      {mode === EButtonType.JOIN ? "참여하기" : "참여 취소하기"}
    </Button>
  );
}
