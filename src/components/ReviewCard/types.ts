import { ReviewType } from "@/lib/types/reviews";

// Main container
export interface ReviewCardProps {
  className?: string;
  children: React.ReactNode;
}

// User related
export interface ReviewCardUserAvatarProps {
  image: ReviewType["user"]["image"];
  size?: number;
}

export interface ReviewCardUserNameProps {
  nickName: ReviewType["user"]["nickName"];
}

// Review 관련
export interface ReviewCardRatingProps {
  score: ReviewType["score"];
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
}

export interface ReviewCardGatheringTitleProps {
  children: React.ReactNode;
}

export interface ReviewCardGatheringInfoProps {
  location: ReviewType["gathering"]["location"];
  days: string;
}

// Header
export interface ReviewCardHeaderProps {
  profileImage: ReviewType["user"]["image"];
  nickName: ReviewType["user"]["nickName"];
  score: ReviewType["score"];
  createdAt: ReviewType["createdAt"];
}

// Body
export interface ReviewCardBodyProps {
  gatheringName: ReviewType["gathering"]["name"];
  location: ReviewType["gathering"]["location"];
  days: string;
  comment: ReviewType["comment"];
}
