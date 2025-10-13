import { cn } from "@/lib/utils";

import { ReviewCardComment } from "./ReviewCardComment";
import ReviewCardDivider from "./ReviewCardDivider";
import { ReviewCardImage } from "./ReviewCardImage";
import { ReviewCardLocation } from "./ReviewCardLocation";
import { ReviewCardProfile } from "./ReviewCardProfile";
import { ReviewCardProps } from "./types";

export function ReviewCard({ className, children }: ReviewCardProps) {
  return (
    <li
      className={cn("relative list-none rounded-4xl bg-white p-6", className)}
    >
      <section className="block h-full w-full">{children}</section>
    </li>
  );
}

ReviewCard.Comment = ReviewCardComment;
ReviewCard.Image = ReviewCardImage;
ReviewCard.Profile = ReviewCardProfile;
ReviewCard.Location = ReviewCardLocation;
ReviewCard.Divider = ReviewCardDivider;
