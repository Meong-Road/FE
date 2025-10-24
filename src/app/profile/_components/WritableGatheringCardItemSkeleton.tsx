import GatheringCardSkeletonComp from "@/components/GatheringCard/Skeleton/GatheringCardSkeleton";

export default function WritableGatheringCardItemSkeleton() {
  return (
    <GatheringCardSkeletonComp>
      <div className="flex h-full flex-row items-center gap-6">
        <GatheringCardSkeletonComp.Image />
        <div className="flex h-full flex-grow flex-col justify-between gap-y-11 py-2">
          <div className="flex items-start justify-between gap-x-2">
            <div className="flex flex-col gap-y-4">
              <div className="flex flex-row justify-start gap-x-2">
                <GatheringCardSkeletonComp.DeadlineBadge />
                <GatheringCardSkeletonComp.ConfirmedBadge />
              </div>
              <GatheringCardSkeletonComp.Title />
            </div>
            <GatheringCardSkeletonComp.LikeBtn />
          </div>
          <div className="flex w-full items-end justify-between">
            <div>
              <GatheringCardSkeletonComp.People />
              <GatheringCardSkeletonComp.Info />
            </div>
            <GatheringCardSkeletonComp.JoinBtn />
          </div>
        </div>
      </div>
    </GatheringCardSkeletonComp>
  );
}
