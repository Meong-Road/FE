"use client";

import { MouseEvent } from "react";
import { toast } from "sonner";

import { useGatheringStateContext } from "@/hooks/context/useGatheringStateContext";
import {
  useCancelJoinGathering,
  useJoinGathering,
} from "@/hooks/queries/gatherings";
import { useCancelGathering } from "@/hooks/queries/gatherings/useCancelGathering";
import { useGetIsParticipating } from "@/hooks/queries/gatherings/useGetIsParticipating";
import { GATHERING_STATE_MESSAGE } from "@/lib/constants/gathering";
import { PATH } from "@/lib/constants/path";
import {
  EGatheringState,
  EGatheringType,
  GatheringType,
} from "@/lib/types/gatherings";
import { cn } from "@/lib/utils";
import { checkIsClosedGatheringState } from "@/lib/utils/gathering";
import { useAuthRequiredModalStore } from "@/store/modalStore";

import { Button, buttonVariants } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

import GatheringCardSkeleton from "./Skeleton/GatheringCardSkeleton";
import { GatheringCardReviewBtn } from "./GatheringCardReviewBtn";

enum EJoinButtonType {
  JOIN = "join",
  CANCEL_JOIN = "cancelJoin",
  CANCEL_GATHERING = "cancelGathering",
}

const MESSAGE: Record<EJoinButtonType, string> = {
  [EJoinButtonType.JOIN]: "참여",
  [EJoinButtonType.CANCEL_JOIN]: "참여 취소",
  [EJoinButtonType.CANCEL_GATHERING]: "개설 취소",
};

const IS_AVAILABLE: Record<
  EGatheringState,
  { join: boolean; cancel: boolean; cancelGathering: boolean }
> = {
  [EGatheringState.REGISTRATION_END_PASSED]: {
    join: false,
    cancel: false,
    cancelGathering: false,
  },
  [EGatheringState.FIXED_GATHERING]: {
    join: true,
    cancel: false,
    cancelGathering: false,
  },
  [EGatheringState.CAPACITY_FULL]: {
    join: false,
    cancel: false,
    cancelGathering: false,
  },
  [EGatheringState.CANCELED]: {
    join: false,
    cancel: false,
    cancelGathering: false,
  },
  [EGatheringState.PET_REQUIRED]: {
    join: false,
    cancel: true,
    cancelGathering: false,
  },
  [EGatheringState.AUTH_REQUIRED]: {
    join: false,
    cancel: false,
    cancelGathering: false,
  },
  [EGatheringState.GENERAL]: {
    join: true,
    cancel: true,
    cancelGathering: true,
  },
};

export function GatheringCardJoinBtn() {
  const { gathering, user, state } = useGatheringStateContext();
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
  const { mutateAsync: cancelGathering, isPending: isCancelGatheringPending } =
    useCancelGathering();
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

  // REGULAR + FIXED_GATHERING + 참여한 모임 + 호스트가 아니면 ReviewBtn 렌더링
  const shouldShowReviewBtn =
    gathering.type === EGatheringType.REGULAR &&
    state === EGatheringState.FIXED_GATHERING &&
    isParticipated === true &&
    user?.id !== gathering.hostId;

  if (shouldShowReviewBtn) {
    return <GatheringCardReviewBtn />;
  }

  //1. 호스트면 무조건 참여했으므로 cancelGatheringBtn 렌더링
  //2. 참여하지 않은 모임이면 joinBtn 렌더링
  //3. 참여한 모임이면 cancelJoinBtn 렌더링
  const mode =
    user?.id === gathering.hostId
      ? EJoinButtonType.CANCEL_GATHERING
      : isParticipated
        ? EJoinButtonType.CANCEL_JOIN
        : EJoinButtonType.JOIN;
  const isMutationPending =
    isJoinPending || isCancelPending || isCancelGatheringPending;

  const handleButtonClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      openModal(PATH.SIGNIN);
      return;
    }

    try {
      if (mode === EJoinButtonType.CANCEL_JOIN) {
        await cancelJoin({ id: gathering.id });
      } else if (mode === EJoinButtonType.CANCEL_GATHERING) {
        await cancelGathering({ id: gathering.id });
      } else if (mode === EJoinButtonType.JOIN) {
        await join({ id: gathering.id });
      }
      toast.success(`[${gathering.name}] 모임을 ${MESSAGE[mode]}했어요`);
    } catch (error) {
      console.error(error);
      toast.error(
        `[${gathering.name}] 모임을 ${MESSAGE[mode]} 하는 중 오류가 발생했어요`,
      );
    }
  };

  const isJoinDisabled =
    mode === EJoinButtonType.JOIN && !IS_AVAILABLE[state].join;
  const isCancelDisabled =
    mode === EJoinButtonType.CANCEL_JOIN && !IS_AVAILABLE[state].cancel;
  const isCancelGatheringDisabled =
    mode === EJoinButtonType.CANCEL_GATHERING &&
    !IS_AVAILABLE[state].cancelGathering;
  const button = (
    <Button
      size="xl"
      variant={
        mode === EJoinButtonType.JOIN
          ? "default"
          : mode === EJoinButtonType.CANCEL_JOIN
            ? "outline"
            : "destructive"
      }
      onClick={handleButtonClick}
      disabled={
        isMutationPending ||
        isJoinDisabled ||
        isCancelDisabled ||
        isCancelGatheringDisabled
      }
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
