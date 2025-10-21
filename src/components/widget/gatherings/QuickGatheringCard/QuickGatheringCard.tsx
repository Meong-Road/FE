import Link from "next/link";

import { GatheringCard } from "@/components/GatheringCard";
import { PATH } from "@/lib/constants/path";
import { QuickGatheringType } from "@/lib/types/gatherings";
import { formatDate } from "@/lib/utils/dateTime";

interface QuickGatheringCardProps {
  gathering: QuickGatheringType;
}

export default function QuickGatheringCard({
  gathering,
}: QuickGatheringCardProps) {
  return (
    <Link href={PATH.QUICK_DETAIL(gathering.id)}>
      <GatheringCard>
        <div className="flex h-full flex-row items-center gap-6">
          <GatheringCard.Image src={gathering.image} alt={gathering.name} />
          <div className="flex h-full flex-grow flex-col justify-between gap-y-11 py-2">
            <div className="flex items-start justify-between gap-x-2">
              <div className="flex flex-col gap-y-4">
                <div className="flex flex-row justify-start gap-x-2">
                  <GatheringCard.DeadlineBadge
                    registrationEnd={gathering.registrationEnd}
                  />
                  {gathering.participantCount >= 5 && (
                    <GatheringCard.ConfirmedBadge />
                  )}
                </div>
                <GatheringCard.Title>{gathering.name}</GatheringCard.Title>
              </div>
              <GatheringCard.LikeBtn id={gathering.id} />
            </div>
            <div className="flex w-full items-end justify-between">
              <div>
                <GatheringCard.People
                  people={gathering.participantCount}
                  limit={gathering.capacity}
                />
                <GatheringCard.Info
                  location={gathering.location}
                  date={formatDate(gathering.dateTime)}
                />
              </div>
              <GatheringCard.JoinBtn gathering={gathering} />
            </div>
          </div>
        </div>
      </GatheringCard>
    </Link>
  );
}
