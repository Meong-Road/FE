import { Skeleton } from "@/components/ui/skeleton";

export default function ReviewCardGatheringTitleSkeleton() {
  return (
    <div className="flex items-center gap-1">
      <Skeleton className="h-[28px] w-48 sm:h-[28px] sm:w-64" />
      <Skeleton className="size-4 rounded-full" />
    </div>
  );
}
