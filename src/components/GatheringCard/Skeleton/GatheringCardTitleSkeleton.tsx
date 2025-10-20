import { Skeleton } from "@/components/ui/skeleton";

interface GatheringCardTitleSkeletonProps {
  className?: string;
}

export function GatheringCardTitleSkeleton({
  className,
}: GatheringCardTitleSkeletonProps) {
  return <Skeleton fontSize="xl" className={className} />;
}
