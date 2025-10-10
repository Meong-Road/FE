import { ReviewCardComment } from "./ReviewCardComment";
import { ReviewCardImage } from "./ReviewCardImage";
import { ReviewCardInfo } from "./ReviewCardInfo";
import { ReviewCardProfile } from "./ReviewCardProfile";
import { ReviewCardTitle } from "./ReviewCardTitle";
import { ReviewCardProps } from "./types";

export function ReviewCard({ children }: ReviewCardProps) {
  return (
    <li className="relative rounded-3xl bg-white transition-shadow hover:shadow-sm">
      <section className="block h-full w-full p-4 sm:p-6">{children}</section>
    </li>
  );
}

ReviewCard.Comment = ReviewCardComment;
ReviewCard.Image = ReviewCardImage;
ReviewCard.Profile = ReviewCardProfile;
ReviewCard.Title = ReviewCardTitle;
ReviewCard.Info = ReviewCardInfo;
