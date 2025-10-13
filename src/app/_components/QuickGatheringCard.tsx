import { GatheringCard } from "@/components/GatheringCard";
import { QuickGatheringType } from "@/lib/types/gathering";
import { formatDate } from "@/lib/utils/dateTime";

interface QuickGatheringCardProps {
  gathering: QuickGatheringType;
}

export default function QuickGatheringCard({
  gathering,
}: QuickGatheringCardProps) {
  const handleParticipateButtonClick = () => {
    // TODO
    console.log("참여하기");
  };

  return (
    <GatheringCard bgColor="white" id={gathering.id}>
      <div className="flex h-full flex-row gap-6">
        {gathering.image && (
          <GatheringCard.Image
          // src={gathering.image}
          // alt={gathering.name}
          />
        )}
        <div className="flex h-full flex-col justify-between gap-y-11 py-2">
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
        </div>
      </div>
      <GatheringCard.LikeBtn id={gathering.id} />
      <GatheringCard.JoinBtn />
    </GatheringCard>
  );
}
