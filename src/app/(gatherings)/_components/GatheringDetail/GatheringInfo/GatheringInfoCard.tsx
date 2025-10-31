import { GatheringCard } from "@/components/GatheringCard";
import ProgressBar from "@/components/ProgressBar";
import { useGatheringStateContext } from "@/hooks/context/useGatheringStateContext";
import { cn } from "@/lib/utils";

import ParticipantsSummary from "./Participants/ParticipantsSummary";

export default function GatheringInfoCard() {
  const { gathering } = useGatheringStateContext();

  return (
    <div
      className={cn(
        "relative flex-grow rounded-4xl border border-[#ddd] bg-white px-7 py-7 pb-12",
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="mb-6 flex items-center gap-2">
            <GatheringCard.DeadlineBadge />
          </div>
          {/* 오늘 마감 */}
          <GatheringCard.Title className="mb-3" />
        </div>
        <GatheringCard.LikeBtn />
      </div>
      <GatheringCard.Info className="mb-4" />
      <div className="mb-6 justify-self-end">
        <GatheringCard.JoinBtn />
      </div>
      <div className="mb-6 border border-dashed border-[#E5E7EB]"></div>
      <div className="mb-3 flex items-center justify-between">
        <ParticipantsSummary />
        {gathering.participantCount > 5 && <GatheringCard.ConfirmedBadge />}
      </div>
      <ProgressBar
        percentage={(gathering.participantCount / gathering.capacity) * 100}
        max={`최대 ${gathering.capacity}명`}
      />
    </div>
  );
}
