import GatheringInfoCardSkeleton from "../GatheringInfo/Skeleton/GatheringInfoCardSkeleton";
import GatheringInfoImageSkeleton from "../GatheringInfo/Skeleton/GatheringInfoImageSkeleton";

export default function GatheringInfoSectionSkeleton() {
  return (
    <div className="mb-12 flex flex-col gap-3 lg:flex-row">
      <GatheringInfoImageSkeleton className="w-full max-lg:aspect-video lg:w-[456px]" />
      <GatheringInfoCardSkeleton />
    </div>
  );
}
