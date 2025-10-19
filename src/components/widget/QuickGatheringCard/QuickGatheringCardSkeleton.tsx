import GatheringCardSkeleton from "@/components/GatheringCard/Skeleton/GatheringCardSkeleton";
import { EGatheringType } from "@/lib/types/gatherings";

export default function QuickGatheringCardSkeleton() {
  return (
    <GatheringCardSkeleton>
      <div className="flex h-full flex-row items-center gap-6">
        <GatheringCardSkeleton.Image />
        <div className="flex h-full flex-grow flex-col justify-between gap-y-11 py-2">
          <div className="flex items-start justify-between gap-x-2">
            <div className="flex flex-col gap-y-4">
              <div className="flex flex-row justify-start gap-x-2">
                <GatheringCardSkeleton.DeadlineBadge />
                <GatheringCardSkeleton.ConfirmedBadge />
              </div>
              <GatheringCardSkeleton.Title />
            </div>
            <GatheringCardSkeleton.LikeBtn />
          </div>
          <div className="flex w-full items-end justify-between">
            <div>
              <GatheringCardSkeleton.People />
              <GatheringCardSkeleton.Info type={EGatheringType.QUICK} />
            </div>
            <GatheringCardSkeleton.JoinBtn />
          </div>
        </div>
      </div>
    </GatheringCardSkeleton>
  );
}
