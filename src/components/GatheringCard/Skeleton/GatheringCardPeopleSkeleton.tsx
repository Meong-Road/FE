import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface GatheringCardPeopleSkeletonProps {
  className?: string;
}
export function GatheringCardPeopleSkeleton({
  className,
}: GatheringCardPeopleSkeletonProps) {
  return <Skeleton fontSize="sm" className={cn("w-14", className)} />;
}
