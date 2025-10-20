import { PropsWithChildren } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

import { GatheringCardBadgeSkeleton } from "./GatheringCardBadgeSkeleton";
import GatheringCardImageSkeleton from "./GatheringCardImageSkeleton";
import { GatheringCardInfoSkeleton } from "./GatheringCardInfoSkeleton";
import { GatheringCardJoinBtnSkeleton } from "./GatheringCardJoinBtnSkeleton";
import { GatheringCardLikeBtnSkeleton } from "./GatheringCardLikeBtnSkeleton";
import { GatheringCardPeopleSkeleton } from "./GatheringCardPeopleSkeleton";
import { GatheringCardTitleSkeleton } from "./GatheringCardTitleSkeleton";

interface GatheringCardSkeletonProps extends PropsWithChildren {
  className?: string;
}

export default function GatheringCardSkeleton({
  className,
  children,
}: GatheringCardSkeletonProps) {
  return (
    <Skeleton className={cn("relative rounded-4xl p-6", className)}>
      {children}
    </Skeleton>
  );
}

GatheringCardSkeleton.Image = GatheringCardImageSkeleton;
GatheringCardSkeleton.AttendanceBadge = GatheringCardBadgeSkeleton;
GatheringCardSkeleton.ConfirmedBadge = GatheringCardBadgeSkeleton;
GatheringCardSkeleton.DeadlineBadge = GatheringCardBadgeSkeleton;
GatheringCardSkeleton.Title = GatheringCardTitleSkeleton;
GatheringCardSkeleton.People = GatheringCardPeopleSkeleton;
GatheringCardSkeleton.Info = GatheringCardInfoSkeleton;
GatheringCardSkeleton.LikeBtn = GatheringCardLikeBtnSkeleton;
GatheringCardSkeleton.JoinBtn = GatheringCardJoinBtnSkeleton;
