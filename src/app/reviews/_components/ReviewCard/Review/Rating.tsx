import Heart from "@/assets/icons/heart.svg";

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
          <Heart className="fill-primary size-6" />
        </li>
      ))}
      {Array.from({ length: MAX_SCORE - score }, (_, index) => (
        <li
          className="flex flex-shrink-0 items-center justify-center"
          key={index}
        >
          <Heart className="size-6 fill-slate-200" />
        </li>
      ))}
    </ol>
  );
}
