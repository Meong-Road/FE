import { cn } from "@/lib/utils";

import { Body } from "./Body";
import { GatheringImage, GatheringInfo, GatheringTitle } from "./Gathering";
import { Header } from "./Header";
import { Divider, Location, Profile } from "./Legacy";
import { Comment, CreatedAt, Rating } from "./Review";
import { ReviewCardEditButton } from "./ReviewCardEditButton";
import { ReviewCardProps } from "./types";
import { UserAvatar, UserName } from "./User";

export function ReviewCard({ className, children }: ReviewCardProps) {
  return (
    <li
      className={cn(
        "relative list-none rounded-3xl border border-[#ddd] bg-white p-6 sm:rounded-4xl",
        className,
      )}
    >
      <section className="block h-full w-full">{children}</section>
    </li>
  );
}

// 조합
ReviewCard.Header = Header;
ReviewCard.Body = Body;

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

// 하위 호환성 (기존 API)
ReviewCard.Profile = Profile;
ReviewCard.Location = Location;
ReviewCard.Divider = Divider;
ReviewCard.Image = GatheringImage;
