"use client";

import { MouseEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useAuth } from "@/hooks/auth";
import {
  useCancelJoinGathering,
  useJoinGathering,
} from "@/hooks/queries/gatherings";
import { useGetIsParticipating } from "@/hooks/queries/gatherings/useGetIsParticipating";
import { PATH } from "@/lib/constants/path";
import { GatheringType } from "@/lib/types/gatherings";

import { Button } from "../ui/button";

import GatheringCardSkeleton from "./Skeleton/GatheringCardSkeleton";

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

  // 유저가 없거나 로딩 중이면 쿼리 실행 안 함
  const { data, isPending, isError } = useGetIsParticipating({
    id: gathering.id,
    enabled: !!user && !isLoading,
  });

  const { mutateAsync: join, isPending: isJoinPending } = useJoinGathering();
  const { mutateAsync: cancelJoin, isPending: isCancelPending } =
    useCancelJoinGathering();

  if (user && isPending) return <GatheringCardSkeleton.JoinBtn />;
  if (user && (isError || !data))
    return (
      <div className="flex h-11 w-30 items-center justify-center rounded-[10px] bg-slate-50">
        에러
      </div>
    );

  const mode = data?.isParticipated ? "cancel" : "join"; // join - 참여하기 버튼, cancel - 참여 취소하기 버튼
  const isMutationPending = isJoinPending || isCancelPending;

  const handleButtonClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      toast.info("로그인이 필요한 기능이예요");
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
