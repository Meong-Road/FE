import Heart from "@/assets/icons/heart.svg";
import HeartEmpty from "@/assets/icons/heart-empty.svg";

import { ReviewCardRatingProps } from "../types";

const MAX_SCORE = 5;

export function Rating({ score }: ReviewCardRatingProps) {
  return (
    <ol className="flex flex-shrink-0">
      {Array.from({ length: score }, (_, index) => (
        <li
          className="flex flex-shrink-0 items-center justify-center"
          key={index}
        >
          <Heart />
        </li>
      ))}
      {Array.from({ length: MAX_SCORE - score }, (_, index) => (
        <li
          className="flex flex-shrink-0 items-center justify-center"
          key={index}
        >
          <HeartEmpty />
        </li>
      ))}
    </ol>
  );
}
