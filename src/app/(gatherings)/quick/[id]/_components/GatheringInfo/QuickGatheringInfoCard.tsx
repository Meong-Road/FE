import { GatheringCard } from "@/components/GatheringCard";
import ProgressBar from "@/components/ProgressBar";
import { QuickGatheringType } from "@/lib/types/gatherings";
import { formatDate } from "@/lib/utils/dateTime";

interface QuickGatheringInfoCardProps {
  gathering: QuickGatheringType;
}

export default function QuickGatheringInfoCard({
  gathering,
}: QuickGatheringInfoCardProps) {
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
      <GatheringCard.Info
        className="mb-4"
        location={gathering.location}
        date={formatDate(gathering.dateTime)}
      />
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
            <div className="h-7 w-7 rounded-full bg-slate-100"></div>
            <div className="h-7 w-7 rounded-full bg-slate-200"></div>
            <div className="h-7 w-7 rounded-full bg-slate-300"></div>
            <div className="h-7 w-7 rounded-full bg-slate-400"></div>
            <div className="bg-secondary text-primary flex h-7 w-7 items-center justify-center rounded-full text-sm font-semibold">
              +{gathering.participantCount - 4}
            </div>
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
