"use client";

import { MouseEvent } from "react";
import { toast } from "sonner";

import { useGatheringStateContext } from "@/hooks/context/useGatheringStateContext";
import {
  useCancelJoinGathering,
  useJoinGathering,
} from "@/hooks/queries/gatherings";
import { useGetIsParticipating } from "@/hooks/queries/gatherings/useGetIsParticipating";
import { GATHERING_STATE_MESSAGE } from "@/lib/constants/gathering";
import { PATH } from "@/lib/constants/path";
import { EGatheringState, GatheringType } from "@/lib/types/gatherings";
import { cn } from "@/lib/utils";
import { checkIsClosedGatheringState } from "@/lib/utils/gathering";
import { useAuthRequiredModalStore } from "@/store/modalStore";

import { Button, buttonVariants } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

import GatheringCardSkeleton from "./Skeleton/GatheringCardSkeleton";

enum EJoinButtonType {
  JOIN = "join",
  CANCEL = "cancel",
}

const MESSAGE: Record<EJoinButtonType, string> = {
  [EJoinButtonType.JOIN]: "참여",
  [EJoinButtonType.CANCEL]: "참여 취소",
};

const IS_AVAILABLE: Record<
  EGatheringState,
  { join: boolean; cancel: boolean }
> = {
  [EGatheringState.REGISTRATION_END_PASSED]: {
    join: false,
    cancel: false,
  },
  [EGatheringState.FIXED_GATHERING]: {
    join: true,
    cancel: false,
  },
  [EGatheringState.CAPACITY_FULL]: {
    join: false,
    cancel: false,
  },
  [EGatheringState.CANCELED]: {
    join: false,
    cancel: false,
  },
  [EGatheringState.PET_REQUIRED]: {
    join: false,
    cancel: true,
  },
  [EGatheringState.AUTH_REQUIRED]: {
    join: false,
    cancel: false,
  },
  [EGatheringState.GENERAL]: {
    join: true,
    cancel: true,
  },
};

interface GatheringCardJoinBtnProps {
  gathering: GatheringType;
}

export function GatheringCardJoinBtn({ gathering }: GatheringCardJoinBtnProps) {
  const { user, state } = useGatheringStateContext();
  const { openModal } = useAuthRequiredModalStore();
  const isClosedGatheringState = checkIsClosedGatheringState(state);

  // 유저가 없거나 로딩 중이면 쿼리 실행 안 함
  const {
    data: isParticipated,
    isPending: isGettingParticipating,
    isError: isGettingParticipatingError,
  } = useGetIsParticipating({
    id: gathering.id,
    enabled: !isClosedGatheringState,
  });

  const { mutateAsync: join, isPending: isJoinPending } = useJoinGathering();
  const { mutateAsync: cancelJoin, isPending: isCancelPending } =
    useCancelJoinGathering();

  if (isClosedGatheringState)
    return (
      <div
        className={cn(
          buttonVariants({ variant: "gray", size: "xl" }),
          "cursor-not-allowed",
        )}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        모집마감
      </div>
    );

  if (user && isGettingParticipating) return <GatheringCardSkeleton.JoinBtn />;
  if (user && isGettingParticipatingError)
    return (
      <div className="flex h-11 w-30 items-center justify-center rounded-[10px] bg-slate-50">
        에러
      </div>
    );
  const isMutationPending = isJoinPending || isCancelPending;
  const mode = isParticipated ? EJoinButtonType.CANCEL : EJoinButtonType.JOIN;

  const handleButtonClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      openModal(PATH.SIGNIN);
      return;
    }

    try {
      if (isParticipated) await cancelJoin({ id: gathering.id });
      else await join({ id: gathering.id });

      toast.success(`[${gathering.name}] 모임에 ${MESSAGE[mode]}했어요`);
    } catch (error) {
      console.error(error);
      toast.error(
        `[${gathering.name}] 모임에 ${MESSAGE[mode]} 중 오류가 발생했어요`,
      );
    }
  };

  const isJoinDisabled =
    mode === EJoinButtonType.JOIN && !IS_AVAILABLE[state].join;
  const isCancelDisabled =
    mode === EJoinButtonType.CANCEL && !IS_AVAILABLE[state].cancel;
  const button = (
    <Button
      size="xl"
      variant={mode === EJoinButtonType.JOIN ? "default" : "outline"}
      onClick={handleButtonClick}
      disabled={isMutationPending || isJoinDisabled || isCancelDisabled}
    >
      {MESSAGE[mode]}하기
    </Button>
  );

  if (isJoinDisabled || isCancelDisabled)
    return (
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent>
          {GATHERING_STATE_MESSAGE[state]}은 {MESSAGE[mode]}할 수 없어요
        </TooltipContent>
      </Tooltip>
    );

  return button;
}
