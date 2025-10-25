import { ReviewCardGatheringTitleProps } from "../types";

export function GatheringTitle({ children }: ReviewCardGatheringTitleProps) {
  return (
    <h3 className="line-clamp-1 text-lg font-semibold text-zinc-900 sm:text-xl">
      {children}
    </h3>
  );
}
