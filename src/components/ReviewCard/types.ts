import { ReviewType } from "@/lib/types/reviews";

// Main container
export interface ReviewCardProps {
  className?: string;
  children: React.ReactNode;
}

// User related
export interface ReviewCardUserAvatarProps {
  className?: string;
  image: ReviewType["user"]["image"];
  size?: number;
}

export interface ReviewCardUserNameProps {
  nickName: ReviewType["user"]["nickName"];
}

// Review 관련
export interface ReviewCardRatingProps {
  score: number; // ReviewDisplayScore 또는 평균 점수 (number)를 받을 수 있도록
  size?: "sm" | "lg";
}

export interface ReviewCardCreatedAtProps {
  date: ReviewType["createdAt"];
}

export interface ReviewCardCommentProps {
  children: React.ReactNode;
}

// Gathering 관련
export interface ReviewCardGatheringImageProps {
  image: string | null;
  gatheringId: number;
}

export interface ReviewCardGatheringTitleProps {
  children: React.ReactNode;
  gatheringId: number;
}

export interface ReviewCardGatheringInfoProps {
  location: ReviewType["gathering"]["location"];
  days: string;
}
