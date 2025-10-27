import { cn } from "@/lib/utils";

import { Divider } from "./common";
import { GatheringImage, GatheringInfo, GatheringTitle } from "./Gathering";
import { Profile } from "./Profile";
import { Comment, CreatedAt, Rating } from "./Review";
import { ReviewCardEditButton } from "./ReviewCardEditButton";
import { ReviewCardProps } from "./types";
import { UserAvatar, UserName } from "./User";

export function ReviewCard({ className, children }: ReviewCardProps) {
  return (
    <li
      className={cn(
        "group relative list-none rounded-3xl border border-[#ddd] bg-white p-6 sm:rounded-4xl",
        "transition-[box-shadow] duration-200 ease-in-out hover:shadow-md",
        className,
      )}
    >
      <section className="block h-full w-full">{children}</section>
    </li>
  );
}

// Profile 관련
ReviewCard.Profile = Profile;

// User 관련
ReviewCard.UserAvatar = UserAvatar;
ReviewCard.UserName = UserName;

// Review 관련
ReviewCard.Rating = Rating;
ReviewCard.CreatedAt = CreatedAt;
ReviewCard.Comment = Comment;

// Gathering 관련
ReviewCard.GatheringImage = GatheringImage;
ReviewCard.GatheringTitle = GatheringTitle;
ReviewCard.GatheringInfo = GatheringInfo;

// Action 관련
ReviewCard.EditButton = ReviewCardEditButton;

// Common 관련
ReviewCard.Divider = Divider;

// 하위 호환성 (기존 API)
ReviewCard.Image = GatheringImage;
