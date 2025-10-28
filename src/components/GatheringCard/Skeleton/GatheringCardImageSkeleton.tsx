import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface GatheringCardImageSkeletonProps {
  className?: string;
}
export default function GatheringCardImageSkeleton({
  className,
}: GatheringCardImageSkeletonProps) {
  return (
    <Skeleton
      className={cn(
        "relative flex aspect-video w-full flex-shrink-0 items-center justify-center overflow-hidden rounded-3xl border border-[#DDD] sm:size-[188px]",
        className,
      )}
    />
  );
}
