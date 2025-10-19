"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface GatheringCardJoinBtnSkeletonProps {
  className?: string;
}

export function GatheringCardJoinBtnSkeleton({
  className,
}: GatheringCardJoinBtnSkeletonProps) {
  return <Skeleton className={cn("h-9 w-36 rounded-[10px]", className)} />;
}
