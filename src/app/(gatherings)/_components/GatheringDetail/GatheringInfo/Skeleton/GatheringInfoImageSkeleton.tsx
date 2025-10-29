import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface GatheringInfoImageSkeletonProps {
  className?: string;
}
export default function GatheringInfoImageSkeleton({
  className,
}: GatheringInfoImageSkeletonProps) {
  return (
    <Skeleton
      className={cn(
        "flex h-[357px] w-[456px] items-center justify-center overflow-hidden rounded-[20px] border border-[#ddd]",
        className,
      )}
    />
  );
}
