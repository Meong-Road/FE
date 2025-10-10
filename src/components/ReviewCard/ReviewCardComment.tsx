import { ReviewCardCommentProps } from "./types";

export function ReviewCardComment({ children }: ReviewCardCommentProps) {
  return <p className="font-medium text-gray-700">{children}</p>;
}
