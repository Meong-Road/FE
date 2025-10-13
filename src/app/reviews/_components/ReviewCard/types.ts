import { ReviewType } from "@/lib/types/review";

export interface ReviewCardProps {
  children: React.ReactNode;
}

export interface ReviewCardProfileProps {
  profileImage: ReviewType["user"]["image"];
  nickName: ReviewType["user"]["nickName"];
  score: ReviewType["score"];
  createdAt: ReviewType["createdAt"];
}

export interface ReviewCardTitleProps {
  children: React.ReactNode;
}

export interface ReviewCardInfoProps {
  location: ReviewType["gathering"]["location"];
  days: string;
}

export interface ReviewCardCommentProps {
  children: React.ReactNode;
}
