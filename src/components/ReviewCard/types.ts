import { ReviewType } from "@/lib/types/reviews";

export interface ReviewCardProps {
  className?: string;
  children: React.ReactNode;
}

export interface ReviewCardProfileProps {
  score: ReviewType["score"];
  // ! TODO 임시로 optional 처리
  user?: ReviewType["user"];
  date?: ReviewType["createdAt"];
}

export interface ReviewCardLocationProps {
  children: React.ReactNode;
}

export interface ReviewCardCommentProps {
  children: React.ReactNode;
}
