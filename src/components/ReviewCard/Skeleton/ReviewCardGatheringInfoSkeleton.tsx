import { Skeleton } from "@/components/ui/skeleton";

export default function ReviewCardGatheringInfoSkeleton() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Skeleton className="h-[16px] w-[3px]" />
      <Skeleton className="h-[20px] w-16" />
      <Skeleton className="h-[11px] w-[1px]" />
      <Skeleton className="h-[20px] w-16" />
    </div>
  );
}
