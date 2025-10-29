import GatheringCardSkeleton from "@/components/GatheringCard/Skeleton/GatheringCardSkeleton";
import { cn } from "@/lib/utils";

import ParticipantImageSkeleton from "./ParticipantImageSkeleton";

export default function GatheringInfoCardSkeleton() {
  return (
    <div
      className={cn(
        "relative flex-grow rounded-4xl border border-[#ddd] bg-white px-7 py-7 pb-12",
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="mb-6 flex items-center gap-2">
            <GatheringCardSkeleton.DeadlineBadge />
          </div>
          {/* 오늘 마감 */}
          <GatheringCardSkeleton.Title className="mb-5" />
        </div>
        <GatheringCardSkeleton.LikeBtn />
      </div>
      <GatheringCardSkeleton.Info className="mb-4" />
      <div className="mb-6 justify-self-end">
        <GatheringCardSkeleton.JoinBtn />
      </div>
      <div className="mb-6 border border-dashed border-[#E5E7EB]"></div>
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* <div>참여자 {gathering.participantCount}명</div> */}
          <div className="flex h-7 space-x-[-10px]">
            {new Array(4).fill(0).map((_, index) => (
              <ParticipantImageSkeleton key={`${index}-participant-skeleton`} />
            ))}
          </div>
        </div>
        <GatheringCardSkeleton.ConfirmedBadge />
      </div>
      {/* <ProgressBar percentage={0} max={`최대 ${gathering.capacity}명`} /> */}
    </div>
  );
}
