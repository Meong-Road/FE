import GatheringCardSkeletonComp from "@/components/GatheringCard/Skeleton/GatheringCardSkeleton";

export default function GatheringCardItemSkeleton() {
  return (
    <GatheringCardSkeletonComp className="overflow-hidden">
      <div className="flex h-full flex-col items-center sm:flex-row sm:gap-6">
        <GatheringCardSkeletonComp.Image className="max-sm:rounded-none" />
        <div className="flex h-full w-full flex-grow flex-col justify-between gap-y-1.5 max-sm:p-6 sm:gap-y-11 sm:py-2">
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
          <div className="flex w-full flex-col items-start justify-between gap-x-6 gap-y-4 sm:flex-row sm:items-end">
            <div className="flex w-full flex-row-reverse gap-2 max-sm:justify-between sm:flex-col">
              <GatheringCardSkeletonComp.People className="pl-0.5" />
              <GatheringCardSkeletonComp.Info />
            </div>
            <GatheringCardSkeletonComp.JoinBtn />
          </div>
        </div>
      </div>
    </GatheringCardSkeletonComp>
  );
}
