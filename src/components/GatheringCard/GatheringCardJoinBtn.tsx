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
import { EGatheringState, EGatheringType } from "@/lib/types/gatherings";
import { checkIsClosedGatheringState } from "@/lib/utils/gathering";
import { hasLastConsonantLetter } from "@/lib/utils/string";
import { useAuthRequiredModalStore } from "@/store/modalStore";

import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

import GatheringCardSkeleton from "./Skeleton/GatheringCardSkeleton";
import { GatheringCardReviewBtn } from "./GatheringCardReviewBtn";

enum EJoinButtonType {
  JOIN = "join",
  CANCEL = "cancel",
  CANCEL_GATHERING = "cancelGathering",
}

const MESSAGE: Record<EJoinButtonType, string> = {
  [EJoinButtonType.JOIN]: "참여",
  [EJoinButtonType.CANCEL]: "참여 취소",
  [EJoinButtonType.CANCEL_GATHERING]: "개설 취소",
};

const JOIN_AVAILABLE_SET = new Set<EGatheringState>([
  EGatheringState.FIXED_GATHERING,
  EGatheringState.GENERAL,
]);

const CANCEL_AVAILABLE_SET = new Set<EGatheringState>([
  EGatheringState.PET_REQUIRED,
  EGatheringState.GENERAL,
]);

const CANCEL_GATHERING_AVAILABLE_SET = new Set<EGatheringState>([
  EGatheringState.GENERAL,
]);

export function GatheringCardJoinBtn() {
  const { gathering, user, state } = useGatheringStateContext();
  const { openModal } = useAuthRequiredModalStore();

  const isClosedGatheringState = checkIsClosedGatheringState(state);

  const {
    data: isParticipated,
    isPending: isGettingParticipating,
    isError: isGettingParticipatingError,
  } = useGetIsParticipating({
    id: gathering.id,
    enabled: !!user && !isClosedGatheringState,
  });

  const { mutateAsync: join, isPending: isJoinPending } = useJoinGathering();
  const { mutateAsync: cancelJoin, isPending: isCancelPending } =
    useCancelJoinGathering();
  const { mutateAsync: cancelGathering, isPending: isCancelGatheringPending } =
    useCancelGathering();

  if (isClosedGatheringState) {
    return (
      <Button size="xl" variant="gray" disabled>
        모집마감
      </Button>
    );
  }

  if (user && isGettingParticipating) return <GatheringCardSkeleton.JoinBtn />;
  if (user && isGettingParticipatingError) {
    return (
      <div className="flex h-11 w-30 items-center justify-center rounded-[10px] bg-slate-50">
        에러
      </div>
    );
  }

  //리뷰 버튼 조건: REGULAR + FIXED_GATHERING + 참여중 + 비호스트
  const shouldShowReviewBtn =
    gathering.type === EGatheringType.REGULAR &&
    state === EGatheringState.FIXED_GATHERING &&
    isParticipated === true &&
    user?.id !== gathering.hostId;

  if (shouldShowReviewBtn) return <GatheringCardReviewBtn />;

  //호스트면 무조건 개설 취소, 참여자면 참여 취소, 비참여자면 참여 버튼
  const mode: EJoinButtonType =
    user?.id === gathering.hostId
      ? EJoinButtonType.CANCEL_GATHERING
      : isParticipated
        ? EJoinButtonType.CANCEL
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
      if (mode === EJoinButtonType.CANCEL_GATHERING) {
        await cancelGathering({ id: gathering.id });
      } else if (mode === EJoinButtonType.CANCEL) {
        await cancelJoin({ id: gathering.id });
      } else {
        await join({ id: gathering.id });
      }
      toast.success(`[${gathering.name}] 모임을 ${MESSAGE[mode]}했어요`);
    } catch (error) {
      console.error(error);
      toast.error(
        `[${gathering.name}] 모임을 ${MESSAGE[mode]} 중 오류가 발생했어요`,
      );
    }
  };

  const isJoinDisabled =
    mode === EJoinButtonType.JOIN && !JOIN_AVAILABLE_SET.has(state);
  const isCancelDisabled =
    mode === EJoinButtonType.CANCEL && !CANCEL_AVAILABLE_SET.has(state);
  const isCancelGatheringDisabled =
    mode === EJoinButtonType.CANCEL_GATHERING &&
    !CANCEL_GATHERING_AVAILABLE_SET.has(state);

  const disabled =
    isMutationPending ||
    isJoinDisabled ||
    isCancelDisabled ||
    isCancelGatheringDisabled;

  const variant =
    mode === EJoinButtonType.JOIN
      ? "default"
      : mode === EJoinButtonType.CANCEL
        ? "outline"
        : "destructive";

  const button = (
    <Button
      size="xl"
      variant={variant}
      onClick={handleButtonClick}
      disabled={disabled}
    >
      {MESSAGE[mode]}하기
    </Button>
  );

  if (isJoinDisabled || isCancelDisabled || isCancelGatheringDisabled) {
    const stateMsg = GATHERING_STATE_MESSAGE[state];
    const particle = hasLastConsonantLetter(stateMsg) ? "은" : "는";
    return (
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent>
          {stateMsg} {particle} {MESSAGE[mode]}할 수 없어요
        </TooltipContent>
      </Tooltip>
    );
  }

  return button;
}
