import { ReviewCardCommentProps } from "./types";

export function ReviewCardComment({ children }: ReviewCardCommentProps) {
  return (
    <p className="text-sm leading-relaxed text-slate-700 sm:text-base">
      {children}
    </p>
  );
}
