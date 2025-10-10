import Link from "next/link";

import { GatheringCard } from "@/components/GatheringCard";
import { RegularGatheringType } from "@/lib/types/gathering";

interface RegularGatheringCardProps {
  gathering: RegularGatheringType;
}

export default function RegularGatheringCard({
  gathering,
}: RegularGatheringCardProps) {
  return (
    <Link href={`/regular/${gathering.id}`}>
      <GatheringCard bgColor="white">
        <div className="flex h-full flex-row items-center gap-6">
          {gathering.image && (
            <GatheringCard.Image
            // src={gathering.image}
            // alt={gathering.name}
            />
          )}
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
                  time={`${gathering.time}:00`}
                  days={gathering.day}
                />
              </div>
              <GatheringCard.JoinBtn />
            </div>
          </div>
        </div>
      </GatheringCard>
    </Link>
  );
}
