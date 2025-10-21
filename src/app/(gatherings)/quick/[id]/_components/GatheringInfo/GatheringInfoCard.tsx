import { GatheringCard } from "@/components/GatheringCard";
import ProgressBar from "@/components/ProgressBar";
import { useGet4Participants } from "@/hooks/queries/gatherings/useGet4Participants";
import { EGatheringType, GatheringType } from "@/lib/types/gatherings";
import { formatDate } from "@/lib/utils/dateTime";

import ParticipantImage from "./ParticipantImage";

interface GatheringInfoCardProps {
  gathering: GatheringType;
}

export default function GatheringInfoCard({
  gathering,
}: GatheringInfoCardProps) {
  const { data: participants } = useGet4Participants({ id: gathering.id });
  return (
    <GatheringCard className="flex-grow border border-[#ddd] px-10">
      <div className="flex items-start justify-between">
        <div>
          <div className="mb-6 flex items-center gap-2">
            <GatheringCard.DeadlineBadge
              registrationEnd={gathering.registrationEnd}
            />
          </div>
          {/* 오늘 마감 */}
          <GatheringCard.Title className="mb-5">
            {gathering.name}
          </GatheringCard.Title>
        </div>
        <GatheringCard.LikeBtn id={gathering.id} />
      </div>
      {gathering.type === EGatheringType.QUICK ? (
        <GatheringCard.Info
          className="mb-4"
          location={gathering.location}
          date={formatDate(gathering.dateTime)}
        />
      ) : (
        <GatheringCard.Info
          className="mb-4"
          location={gathering.location}
          days={gathering.days}
        />
      )}
      <div className="mb-6 justify-self-end">
        <GatheringCard.JoinBtn gathering={gathering} />
      </div>
      <div className="mb-6 border border-dashed border-[#E5E7EB]"></div>
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="font-semibold">
            참여자 {gathering.participantCount}명
          </div>
          <div className="flex space-x-[-10px]">
            {/* // TODO 참여자들의 이미지 최대 4개를 보여준다 */}
            {participants?.map((participant) => (
              <ParticipantImage
                key={participant.id}
                participant={participant}
              />
            ))}
            {gathering.participantCount > 4 && (
              <div className="bg-secondary text-primary z-10 flex h-7 w-7 items-center justify-center rounded-full text-sm font-semibold">
                +{gathering.participantCount - 4}
              </div>
            )}
          </div>
        </div>
        {gathering.participantCount > 5 && <GatheringCard.ConfirmedBadge />}
      </div>
      <ProgressBar
        percentage={(gathering.participantCount / gathering.capacity) * 100}
        max={`최대 ${gathering.capacity}명`}
      />
    </GatheringCard>
  );
}
