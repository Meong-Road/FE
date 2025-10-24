"use client";

import { ElementType } from "react";

import { GatheringCard } from "@/components/GatheringCard";
import { GatheringCardReviewBtn } from "@/components/GatheringCard/GatheringCardReviewBtn";
import GatheringCardSkeleton from "@/components/GatheringCard/Skeleton/GatheringCardSkeleton";
import { useGetUserReviewByGathering } from "@/hooks/queries/reviews";
import { GatheringType } from "@/lib/types/gatherings";

interface WritableGatheringCardItemProps {
  gathering: GatheringType & { joinedAt: string };
  as?: ElementType;
}

export default function WritableGatheringCardItem({
  gathering,
  as = "div",
}: WritableGatheringCardItemProps) {
  // 사용자가 작성한 리뷰 조회
  const { data: userReview, isPending } = useGetUserReviewByGathering(
    gathering.id,
  );

  // 로딩 중
  if (isPending) {
    return <GatheringCardSkeleton />;
  }

  // 이미 리뷰를 작성한 경우 렌더링하지 않음
  if (userReview) {
    return null;
  }

  return (
    <GatheringCard gathering={gathering} as={as}>
      <div className="flex h-full flex-row items-center gap-6">
        <GatheringCard.Image />
        <div className="flex h-full flex-grow flex-col justify-between gap-y-11 py-2">
          <div className="flex items-start justify-between gap-x-2">
            <div className="flex flex-col gap-y-4">
              <div className="flex flex-row justify-start gap-x-2">
                <GatheringCard.DeadlineBadge />
                {gathering.participantCount >= 5 && (
                  <GatheringCard.ConfirmedBadge />
                )}
              </div>
              <GatheringCard.Title />
            </div>
            <GatheringCard.LikeBtn />
          </div>
          <div className="flex w-full items-end justify-between">
            <div>
              <GatheringCard.People />
              <GatheringCard.Info />
            </div>
            <GatheringCardReviewBtn gathering={gathering} />
          </div>
        </div>
      </div>
    </GatheringCard>
  );
}
