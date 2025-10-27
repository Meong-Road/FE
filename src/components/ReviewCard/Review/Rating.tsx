import Heart from "@/assets/icons/heart.svg";
import HeartHalf from "@/assets/icons/heart-half.svg";
import { cn } from "@/lib/utils";

import { ReviewCardRatingProps } from "../types";

const MAX_SCORE = 5;

export function Rating({ score, size }: ReviewCardRatingProps) {
  const fullHearts = Math.floor(score);
  const hasHalfHeart = score % 1 !== 0;
  const emptyHearts = MAX_SCORE - Math.ceil(score);

  return (
    <ol className="flex flex-shrink-0">
      {/* 채워진 하트 */}
      {Array.from({ length: fullHearts }, (_, index) => (
        <li
          className="flex flex-shrink-0 items-center justify-center"
          key={`full-${index}`}
        >
          <Heart
            className={cn(
              "text-primary",
              size === "lg" ? "size-9.5" : "size-5 sm:size-6",
            )}
          />
        </li>
      ))}

      {/* 반쪽 하트 */}
      {hasHalfHeart && (
        <li className="flex flex-shrink-0 items-center justify-center">
          <HeartHalf
            className={cn(
              "text-primary",
              size === "lg" ? "size-9.5" : "size-5 sm:size-6",
            )}
          />
        </li>
      )}

      {/* 빈 하트 */}
      {Array.from({ length: emptyHearts }, (_, index) => (
        <li
          className="flex flex-shrink-0 items-center justify-center"
          key={`empty-${index}`}
        >
          <Heart
            className={cn(
              "fill-slate-200",
              size === "lg" ? "size-9.5" : "size-5 sm:size-6",
            )}
          />
        </li>
      ))}
    </ol>
  );
}
