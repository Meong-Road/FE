import { ReviewType } from "@/lib/types/review";
import { formatDays } from "@/lib/utils/dateTime";

import { ReviewCard } from "./ReviewCard/ReviewCard";

interface ReviewListProps {
  reviews: ReviewType[];
}

export function ReviewList({ reviews }: ReviewListProps) {
  if (reviews.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-gray-500">해당 지역의 리뷰가 없습니다.</p>
      </div>
    );
  }

  return (
    <ol className="space-y-3 sm:space-y-4">
      {reviews.map((review) => (
        <ReviewCard key={review.id}>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:gap-8">
            <ReviewCard.Image image={review.gathering.image} />
            <div className="flex flex-1 flex-col justify-between">
              <ReviewCard.Profile
                profileImage={review.user.image}
                score={review.score}
                nickName={review.user.nickName}
                createdAt={review.createdAt}
              />
              <div className="flex flex-col gap-2.5">
                <ReviewCard.Title>{review.gathering.name}</ReviewCard.Title>
                <ReviewCard.Info
                  location={review.gathering.location}
                  days={formatDays(review.gathering.days)}
                />
                <ReviewCard.Comment>{review.comment}</ReviewCard.Comment>
              </div>
            </div>
          </div>
        </ReviewCard>
      ))}
    </ol>
  );
}
