import { ElementType } from "react";
import Link from "next/link";

import { GatheringCard } from "@/components/GatheringCard";
import { GatheringType } from "@/lib/types/gatherings";
import { formatDate } from "@/lib/utils/dateTime";
import { isRegularGathering } from "@/lib/utils/typeGuard";

interface GatheringProps {
  gathering: GatheringType;
  href?: string;
  as?: ElementType;
  isInvalid?: boolean;
}

export default function GatheringCardItem({
  gathering,
  href,
  as = "div",
  isInvalid = false,
}: GatheringProps) {
  const content = (
    <GatheringCard as={as}>
      <div className="flex h-full flex-row items-center gap-6">
        {gathering.image && (
          <GatheringCard.Image
            src={gathering.image}
            alt={gathering.name}
            isInvalid={isInvalid}
          />
        )}
        <div className="flex h-full flex-grow flex-col justify-between gap-y-11 py-2">
          <div className="flex items-start justify-between gap-x-2">
            <div className="flex flex-col gap-y-4">
              <div className="flex flex-row justify-start gap-x-2">
                <GatheringCard.DeadlineBadge
                  registrationEnd={gathering.registrationEnd}
                  isInvalid={isInvalid}
                />
                {gathering.participantCount >= 5 && (
                  <GatheringCard.ConfirmedBadge isInvalid={isInvalid} />
                )}
              </div>
              <GatheringCard.Title>{gathering.name}</GatheringCard.Title>
            </div>
            <GatheringCard.LikeBtn
              gathering={gathering}
              isInvalid={isInvalid}
            />
          </div>
          <div className="flex w-full items-end justify-between">
            <div>
              <GatheringCard.People
                people={gathering.participantCount}
                limit={gathering.capacity}
              />
              {isRegularGathering(gathering) ? (
                <GatheringCard.Info
                  location={gathering.location}
                  days={gathering.days}
                />
              ) : (
                <GatheringCard.Info
                  location={gathering.location}
                  date={formatDate(gathering.dateTime)}
                />
              )}
            </div>
            <GatheringCard.JoinBtn
              gathering={gathering}
              isInvalid={isInvalid}
            />
          </div>
        </div>
      </div>
    </GatheringCard>
  );

  return href ? <Link href={href}>{content}</Link> : content;
}
