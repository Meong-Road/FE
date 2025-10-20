"use client";

import { MouseEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useAuth } from "@/hooks/auth";
import {
  useCancelJoinGathering,
  useJoinGathering,
} from "@/hooks/queries/gatherings";
import { PATH } from "@/lib/constants/path";
import { GatheringType } from "@/lib/types/gatherings";

import { Button } from "../ui/button";

interface GatheringCardJoinBtnProps {
  gathering: GatheringType;
}

const SUCCESS_MESSAGE = {
  join: "모임에 참여했어요",
  cancel: "모임에 참여 취소했어요",
};

const ERROR_MESSAGE = {
  join: "모임 참여에 실패했어요",
  cancel: "모임 참여 취소에 실패했어요",
};

export function GatheringCardJoinBtn({ gathering }: GatheringCardJoinBtnProps) {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const { mutateAsync: join, isPending: isJoinPending } = useJoinGathering();
  const { mutateAsync: cancelJoin, isPending: isCancelPending } =
    useCancelJoinGathering();
  const mode = gathering.isParticipating ? "cancel" : "join"; // join - 참여하기 버튼, cancel - 참여 취소하기 버튼
  const isMutationPending = isJoinPending || isCancelPending;

  const handleButtonClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      router.push(PATH.SIGNIN);
      return;
    }

    try {
      if (mode === "cancel") await cancelJoin({ id: gathering.id });
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
      variant={mode === "join" ? "default" : "outline"}
      onClick={handleButtonClick}
      disabled={isLoading || isMutationPending}
    >
      {mode === "join" ? "참여하기" : "참여 취소하기"}
    </Button>
  );
}
