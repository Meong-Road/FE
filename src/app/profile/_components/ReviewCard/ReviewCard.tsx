import { ReviewCardComment } from "./ReviewCardComment";
import { ReviewCardImage } from "./ReviewCardImage";
import { ReviewCardLoacation } from "./ReviewCardLocation";
import { ReviewCardProfile } from "./ReviewCardProfile";
import { ReviewCardProps } from "./types";

export function ReviewCard({ children }: ReviewCardProps) {
  return (
    <li className="relative rounded-4xl bg-white">
      <section className="block h-full w-full p-6">{children}</section>
    </li>
  );
}

ReviewCard.Comment = ReviewCardComment;
ReviewCard.Image = ReviewCardImage;
ReviewCard.Profile = ReviewCardProfile;
ReviewCard.Location = ReviewCardLoacation;
