"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface GatheringCardJoinBtnSkeletonProps {
  className?: string;
}

export function GatheringCardJoinBtnSkeleton({
  className,
}: GatheringCardJoinBtnSkeletonProps) {
  return <Skeleton className={cn("h-11 w-30 rounded-[10px]", className)} />;
}
