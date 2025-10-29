import { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

import { Divider } from "../common";

import ReviewCardCommentSkeleton from "./ReviewCardCommentSkeleton";
import ReviewCardCreatedAtSkeleton from "./ReviewCardCreatedAtSkeleton";
import ReviewCardGatheringImage from "./ReviewCardGatheringImage";
import ReviewCardProfileSkeleton from "./ReviewCardProfileSkeleton";
import ReviewCardRatingSkeleton from "./ReviewCardRatingSkeleton";
import ReviewCardUserAvatarSkeleton from "./ReviewCardUserAvatarSkeleton";
import ReviewCardUserNameSkeleton from "./ReviewCardUserNameSkeleton";

interface ReviewCardSkeletonProps extends PropsWithChildren {
  className?: string;
}

export function ReviewCardSkeleton({
  className,
  ...props
}: ReviewCardSkeletonProps) {
  return (
    <div className={cn("relative rounded-3xl sm:p-6", className)} {...props} />
  );
}

ReviewCardSkeleton.Comment = ReviewCardCommentSkeleton;
ReviewCardSkeleton.CreatedAt = ReviewCardCreatedAtSkeleton;
ReviewCardSkeleton.Divider = Divider;
ReviewCardSkeleton.GatheringImage = ReviewCardGatheringImage;
ReviewCardSkeleton.Profile = ReviewCardProfileSkeleton;
ReviewCardSkeleton.Rating = ReviewCardRatingSkeleton;
ReviewCardSkeleton.UserAvatar = ReviewCardUserAvatarSkeleton;
ReviewCardSkeleton.UserName = ReviewCardUserNameSkeleton;
