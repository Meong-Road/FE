import { Body } from "./Body";
import { GatheringImage, GatheringInfo, GatheringTitle } from "./Gathering";
import { Header } from "./Header";
import { Comment, CreatedAt, Rating } from "./Review";
import { ReviewCardProps } from "./types";
import { UserAvatar, UserName } from "./User";

export function ReviewCard({ children }: ReviewCardProps) {
  return (
    <li className="relative rounded-3xl bg-white transition-shadow hover:shadow-sm">
      <section className="block h-full w-full p-4 sm:p-6">{children}</section>
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
