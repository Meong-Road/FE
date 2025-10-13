import { ReviewType } from "@/lib/types/review";

// Main container
export interface ReviewCardProps {
  children: React.ReactNode;
}

// User related
export interface ReviewCardUserAvatarProps {
  image: ReviewType["user"]["image"];
  size?: number;
}

export interface ReviewCardUserNameProps {
  children: React.ReactNode;
}

// Review metadata
export interface ReviewCardRatingProps {
  score: ReviewType["score"];
}

export interface ReviewCardCreatedAtProps {
  date: ReviewType["createdAt"];
}

export interface ReviewCardCommentProps {
  children: React.ReactNode;
}

// Gathering related
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

// Header (composed)
export interface ReviewCardHeaderProps {
  profileImage: ReviewType["user"]["image"];
  nickName: ReviewType["user"]["nickName"];
  score: ReviewType["score"];
  createdAt: ReviewType["createdAt"];
}

// Body (composed)
export interface ReviewCardBodyProps {
  gatheringName: ReviewType["gathering"]["name"];
  location: ReviewType["gathering"]["location"];
  days: string;
  comment: ReviewType["comment"];
}
