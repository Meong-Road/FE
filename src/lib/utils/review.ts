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
