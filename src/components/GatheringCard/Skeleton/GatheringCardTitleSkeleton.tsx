import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface GatheringCardTitleSkeletonProps {
  className?: string;
}

export function GatheringCardTitleSkeleton({
  className,
}: GatheringCardTitleSkeletonProps) {
  return (
    <Skeleton
      fontSize="lg"
      tabletFontSize="xl"
      className={cn("w-40", className)}
    />
  );
}
