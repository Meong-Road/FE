import Heart from "@/assets/icons/heart.svg";
import Profile from "@/assets/images/profile3.svg";

import { ReviewCardProfileProps } from "./types";

export function ReviewCardProfile({ score }: ReviewCardProfileProps) {
  return (
    <div className="flex items-center gap-0.5">
      <div className="flex h-[38px] w-[38px] items-center justify-center overflow-hidden rounded-full border-[1px] border-slate-100">
        <Profile width={38} height={38} />
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium text-slate-500">럽원즈올</span>
        <div className="flex gap-2">
          <ul className="flex">
            {Array.from({ length: score }, (_, index) => (
              <li key={index}>
                <Heart width={24} height={24} />
              </li>
            ))}
          </ul>
          <span className="text-sm text-slate-400">2024.01.25</span>
        </div>
      </div>
    </div>
  );
}
