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
import { checkIsClosedGatheringState } from "@/lib/utils/gathering";
import { hasLastConsonantLetter } from "@/lib/utils/string";
import { useAuthRequiredModalStore } from "@/store/modalStore";

import { Button } from "../ui/button";
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

const JOIN_AVAILABLE_SET = new Set([
  EGatheringState.FIXED_GATHERING,
  EGatheringState.GENERAL,
]);

const CANCEL_AVAILABLE_SET = new Set([
  EGatheringState.PET_REQUIRED,
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

  if (user && !isClosedGatheringState && isGettingParticipating)
    return <GatheringCardSkeleton.JoinBtn />;
  if (user && !isClosedGatheringState && isGettingParticipatingError)
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
    mode === EJoinButtonType.JOIN && !JOIN_AVAILABLE_SET.has(state);
  const isCancelDisabled =
    mode === EJoinButtonType.CANCEL && !CANCEL_AVAILABLE_SET.has(state);

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
          {GATHERING_STATE_MESSAGE[state]}
          {hasLastConsonantLetter(GATHERING_STATE_MESSAGE[state])
            ? "은"
            : "는"}{" "}
          {MESSAGE[mode]}할 수 없어요
        </TooltipContent>
      </Tooltip>
    );

  return button;
}
