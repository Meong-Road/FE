import { ElementType } from "react";

import { GatheringCard } from "@/components/GatheringCard";
import { GatheringCardReviewBtn } from "@/components/GatheringCard/GatheringCardReviewBtn";
import { GatheringType } from "@/lib/types/gatherings";

interface WritableGatheringCardItemProps {
  gathering: GatheringType & { joinedAt: string };
  as?: ElementType;
}

export default function WritableGatheringCardItem({
  gathering,
  as = "div",
}: WritableGatheringCardItemProps) {
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
