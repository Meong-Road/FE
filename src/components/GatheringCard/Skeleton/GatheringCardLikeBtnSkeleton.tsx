"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface GatheringCardLikeBtnSkeletonProps {
  className?: string;
}

export function GatheringCardLikeBtnSkeleton({
  className,
}: GatheringCardLikeBtnSkeletonProps) {
  return <Skeleton className={cn("h-12 w-12 rounded-full", className)} />;
}
