import { ListContainer } from "@/components/common";
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
        <ReviewCard key={review.id} className="overflow-hidden p-0 sm:p-6">
          <div className="flex w-full flex-col justify-between gap-0 sm:flex-row sm:gap-6">
            <ReviewCard.GatheringImage image={review.gathering.image} />
            <div className="flex w-full flex-col gap-3 p-6 sm:gap-4 sm:p-0 sm:py-2">
              <ReviewCard.Header
                profileImage={review.user?.image || null}
                reviewId={review.id}
                score={review.score}
                nickName={review.user?.nickName || "사용자"}
                createdAt={review.createdAt}
                reviewAuthorId={review.userId}
              />
              <div className="flex flex-col gap-3 px-2">
                <ReviewCard.Body
                  gatheringName={review.gathering.name}
                  location={review.gathering.location}
                  days={formatDays(review.gathering.days)}
                />
                <ReviewCard.Comment>{review.comment}</ReviewCard.Comment>
              </div>
            </div>
          </div>
        </ReviewCard>
      ))}
    </ListContainer>
  );
}
