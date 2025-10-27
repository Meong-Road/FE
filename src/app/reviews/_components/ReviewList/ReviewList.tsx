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
          <div className="flex w-full flex-col gap-0 sm:flex-row sm:gap-6">
            {/* 모임 이미지 */}
            <ReviewCard.GatheringImage
              image={review.gathering.image}
              gatheringId={review.gatheringId}
            />

            {/* 리뷰 콘텐츠 */}
            <div className="relative flex w-full flex-1 flex-col gap-3 p-5 sm:gap-5 sm:p-0 sm:py-2">
              {/* 프로필 (사용자 정보, 별점, 날짜) */}
              <ReviewCard.Profile
                user={review.user}
                score={review.score}
                date={review.createdAt}
              />

              {/* 모임 정보 (제목, 위치, 요일) */}
              <div className="flex flex-col gap-1 sm:gap-2">
                <ReviewCard.GatheringTitle gatheringId={review.gatheringId}>
                  {review.gathering.name}
                </ReviewCard.GatheringTitle>
                <ReviewCard.GatheringInfo
                  location={review.gathering.location}
                  days={formatDays(review.gathering.days)}
                />
              </div>

              {/* 리뷰 내용 */}
              <ReviewCard.Comment>{review.comment}</ReviewCard.Comment>

              {/* 수정 버튼 (absolute) */}
              <ReviewCard.EditButton
                reviewId={review.id}
                reviewAuthorId={review.userId}
              />
            </div>
          </div>
        </ReviewCard>
      ))}
    </ListContainer>
  );
}
