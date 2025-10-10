import Heart from "@/assets/icons/heart.svg";
import Profile from "@/assets/images/profile3.svg";

import { ReviewCardProfileProps } from "./types";

export function ReviewCardProfile({
  user,
  score,
  date,
}: ReviewCardProfileProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-[38px] w-[38px] items-center justify-center overflow-hidden rounded-full border-[1px] border-slate-100">
        {/* // TODO user.image */}
        <Profile width={38} height={38} />
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium text-slate-500">
          {user?.name ?? "럽윈즈올"}
        </span>
        <div className="flex gap-2">
          <ul className="flex items-center gap-0.5">
            {[...Array(score)].map((_, idx) => (
              <li key={`rating-filled-${idx}`}>
                <Heart className="fill-primary size-6" />
              </li>
            ))}
            {[...Array(5 - score)].map((_, idx) => (
              <li key={`rating-unfilled-${idx}`}>
                <Heart className="size-6 fill-slate-100" />
              </li>
            ))}
          </ul>
          <span className="text-sm text-slate-400">{date ?? "2024.01.25"}</span>
        </div>
      </div>
    </div>
  );
}
