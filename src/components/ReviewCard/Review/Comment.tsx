import { ReviewCardCommentProps } from "../types";

export function Comment({ children }: ReviewCardCommentProps) {
  return (
    // 말줄임표 추가
    <p className="line-clamp-2 text-sm leading-relaxed text-slate-700 sm:text-base">
      {children}
    </p>
  );
}
