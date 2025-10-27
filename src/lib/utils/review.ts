import {
  ReviewInfoFormSchema,
  ReviewInfoUpdateSchema,
} from "@/components/Modal/ReviewInfoModal/hooks/useReviewInfoForm";
import { ReviewType } from "@/lib/types/reviews";

import { formatDays } from "./dateTime";

/**
 * 리뷰 정보를 가공하여 반환
 */
export const processReviewInfo = (review: ReviewType) => {
  return {
    ...review,
    formattedDays: formatDays(review.gathering.days),
  };
};

/**
 * 리뷰 리스트를 가공하여 반환
 */
export const processReviewsInfo = (reviews: ReviewType[]) => {
  return reviews.map(processReviewInfo);
};

export const hasReviewFormChanges = (
  current: ReviewInfoUpdateSchema,
  initial: Partial<ReviewInfoFormSchema> | null,
): boolean => {
  if (!initial) return false;

  return current.score !== initial.score || current.comment !== initial.comment;
};
