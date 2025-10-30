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
import { EGatheringState } from "@/lib/types/gatherings";
import { checkIsClosedGatheringState } from "@/lib/utils/gathering";
import { hasLastConsonantLetter } from "@/lib/utils/string";
import {
  useAuthRequiredModalStore,
  useConfirmModalStore,
} from "@/store/modalStore";

import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

import GatheringCardSkeleton from "./Skeleton/GatheringCardSkeleton";

enum EJoinButtonType {
  JOIN = "join",
  CANCEL = "cancel",
  CANCEL_GATHERING = "cancelGathering",
}

const MESSAGE: Record<
  EJoinButtonType,
  {
    text: "참여" | "참여 취소" | "개설 취소";
    confirmTitle: string;
    confirmDescription: string;
  }
> = {
  [EJoinButtonType.JOIN]: {
    text: "참여",
    confirmTitle: "모임에 참여하시겠어요?",
    confirmDescription: "개설이 확정된 모임은 취소할 수 없어요.",
  },
  [EJoinButtonType.CANCEL]: {
    text: "참여 취소",
    confirmTitle: "정말 참여를 취소하시겠어요?",
    confirmDescription: "정원이 가득 차면 다시 참여할 수 없어요.",
  },
  [EJoinButtonType.CANCEL_GATHERING]: {
    text: "개설 취소",
    confirmTitle: "모임 개설을 취소하시겠어요?",
    confirmDescription: "개설이 취소된 모임은 되돌릴 수 없어요.",
  },
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
  const { openModal: openAuthRequiredModal } = useAuthRequiredModalStore();
  const { openModal: openConfirmModal } = useConfirmModalStore();

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

  if (user && !isClosedGatheringState && isGettingParticipating)
    return <GatheringCardSkeleton.JoinBtn />;
  if (user && !isClosedGatheringState && isGettingParticipatingError) {
    return (
      <div className="flex h-11 w-30 items-center justify-center rounded-[10px] bg-slate-50">
        에러
      </div>
    );
  }

  //호스트면 무조건 개설 취소, 참여자면 참여 취소, 비참여자면 참여 버튼
  const mode: EJoinButtonType =
    user?.id === gathering.hostId
      ? EJoinButtonType.CANCEL_GATHERING
      : isParticipated
        ? EJoinButtonType.CANCEL
        : EJoinButtonType.JOIN;

  const isMutationPending =
    isJoinPending || isCancelPending || isCancelGatheringPending;

  const handleConfirm = async () => {
    try {
      if (mode === EJoinButtonType.CANCEL_GATHERING) {
        await cancelGathering({ id: gathering.id });
      } else if (mode === EJoinButtonType.CANCEL) {
        await cancelJoin({ id: gathering.id });
      } else {
        await join({ id: gathering.id });
      }
      toast.success(`[${gathering.name}] 모임을 ${MESSAGE[mode].text}했어요`);
    } catch (error) {
      console.error(error);
      toast.error(
        `[${gathering.name}] 모임 ${MESSAGE[mode].text} 중 오류가 발생했어요`,
      );
    }
  };

  const handleButtonClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      openAuthRequiredModal(PATH.SIGNIN);
      return;
    }

    openConfirmModal(
      MESSAGE[mode].text,
      MESSAGE[mode].confirmTitle,
      MESSAGE[mode].confirmDescription,
      handleConfirm,
    );
  };

  const isJoinDisabled =
    mode === EJoinButtonType.JOIN && !JOIN_AVAILABLE_SET.has(state);
  const isCancelDisabled =
    mode === EJoinButtonType.CANCEL && !CANCEL_AVAILABLE_SET.has(state);
  const isCancelGatheringDisabled =
    mode === EJoinButtonType.CANCEL_GATHERING &&
    !CANCEL_GATHERING_AVAILABLE_SET.has(state);

  const button = (
    <Button
      size="xl"
      variant={
        mode === EJoinButtonType.JOIN
          ? "default"
          : mode === EJoinButtonType.CANCEL
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
      {MESSAGE[mode].text}하기
    </Button>
  );

  if (isJoinDisabled || isCancelDisabled || isCancelGatheringDisabled) {
    const stateMsg = GATHERING_STATE_MESSAGE[state];
    const particle = hasLastConsonantLetter(stateMsg) ? "은" : "는";
    return (
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent>
          {stateMsg} {particle} {MESSAGE[mode].text}할 수 없어요
        </TooltipContent>
      </Tooltip>
    );
  }

  return button;
}
