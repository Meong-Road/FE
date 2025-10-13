import { ReviewCardTitleProps } from "./types";

export function ReviewCardTitle({ children }: ReviewCardTitleProps) {
  return (
    <h3 className="line-clamp-1 text-lg font-semibold text-slate-900 sm:text-2xl">
      {children}
    </h3>
  );
}
