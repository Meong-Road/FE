import { ElementType } from "react";
import Link from "next/link";

import { GatheringCard } from "@/components/GatheringCard";
import { GatheringType } from "@/lib/types/gatherings";

interface GatheringProps {
  gathering: GatheringType;
  href?: string;
  as?: ElementType;
}

export default function GatheringCardItem({
  gathering,
  href,
  as = "div",
}: GatheringProps) {
  const content = (
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
            <GatheringCard.JoinBtn />
          </div>
        </div>
      </div>
    </GatheringCard>
  );

  return href ? <Link href={href}>{content}</Link> : content;
}
