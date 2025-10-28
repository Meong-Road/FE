import { ElementType } from "react";
import Link from "next/link";

import { GatheringCard } from "@/components/GatheringCard";
import { GatheringType } from "@/lib/types/gatherings";

interface GatheringProps {
  gathering: GatheringType;
  href?: string;
  isReviewCard?: boolean;
  as?: ElementType;
}

export default function GatheringCardItem({
  gathering,
  href,
  isReviewCard = false,
  as = "div",
}: GatheringProps) {
  const content = (
    <GatheringCard gathering={gathering} as={as} className="overflow-hidden">
      <div className="flex h-full flex-col items-center sm:flex-row sm:gap-6">
        <GatheringCard.Image className="max-sm:rounded-none" />
        <div className="flex h-full w-full flex-grow flex-col justify-between gap-y-1.5 max-sm:p-6 sm:gap-y-11 sm:py-2">
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
          <div className="flex w-full flex-col items-start justify-between gap-x-6 gap-y-4 sm:flex-row sm:items-end">
            <div className="flex w-full flex-row-reverse gap-2 max-sm:justify-between sm:flex-col">
              <GatheringCard.People className="pl-0.5" />
              <GatheringCard.Info />
            </div>
            {isReviewCard ? (
              <GatheringCard.ReviewBtn />
            ) : (
              <GatheringCard.JoinBtn />
            )}
          </div>
        </div>
      </div>
    </GatheringCard>
  );

  return href ? <Link href={href}>{content}</Link> : content;
}
