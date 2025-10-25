import { EmptyState, ListContainer } from "@/components/common";
import { ReviewCard } from "@/components/ReviewCard";
import { ReviewType } from "@/lib/types/reviews";
import { formatDays } from "@/lib/utils/dateTime";

interface ReviewListProps {
  reviews: ReviewType[];
}

export default function ReviewList({ reviews }: ReviewListProps) {
  return (
    <ListContainer>
      {reviews.map((review) => (
        <ReviewCard key={review.id}>
          <div className="flex w-full flex-col justify-between gap-4 sm:flex-row sm:gap-8">
            <ReviewCard.GatheringImage image={review.gathering.image} />
            <div className="flex w-full flex-1 flex-col justify-between">
              <ReviewCard.Header
                profileImage={review.user?.image || null}
                reviewId={review.id}
                score={review.score}
                nickName={review.user?.nickName || "사용자"}
                createdAt={review.createdAt}
                reviewAuthorId={review.userId}
              />
              <ReviewCard.Body
                gatheringName={review.gathering.name}
                location={review.gathering.location}
                days={formatDays(review.gathering.days)}
                comment={review.comment}
              />
            </div>
          </div>
        </ReviewCard>
      ))}
    </ListContainer>
  );
}
