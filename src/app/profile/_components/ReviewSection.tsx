"use client";

import {
  EmptyState,
  ListContainer,
  LoadingState,
  SectionWrapper,
} from "@/components/common";
import ReviewInfoModal from "@/components/Modal/ReviewInfoModal";
import { ReviewCard } from "@/components/ReviewCard";
import { useGetMyReviews } from "@/hooks/queries/reviews";
import { ReviewType } from "@/lib/types/reviews";
import { processReviewInfo } from "@/lib/utils/review";
import { useReviewInfoModalStore } from "@/store/modalStore";

const ReviewItem = ({
  review,
}: {
  review: ReturnType<typeof processReviewInfo>;
}) => (
  <ReviewCard>
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:gap-8">
      {/* 모임 이미지 */}
      <ReviewCard.GatheringImage image={review.gathering.image} />

      {/* 리뷰 내용 */}
      <div className="flex flex-1 flex-col justify-between">
        {/* 헤더: 유저 정보 + 평점 + 작성날짜 */}
        <ReviewCard.Header
          profileImage={review.user.image}
          reviewId={review.id}
          score={review.score}
          nickName={review.user.nickName}
          createdAt={review.createdAt}
          reviewAuthorId={review.userId}
        />

        {/* 본문: 모임 정보 + 코멘트 */}
        <ReviewCard.Body
          gatheringName={review.gathering.name}
          location={review.gathering.location}
          days={review.formattedDays}
          comment={review.comment}
        />
      </div>
    </div>
  </ReviewCard>
);

const ReviewList = ({ reviews }: { reviews: ReviewType[] }) => (
  <ListContainer>
    {reviews.map((review) => (
      <ReviewItem key={review.id} review={processReviewInfo(review)} />
    ))}
  </ListContainer>
);

export default function ReviewSection() {
  const { isOpen, modalType, reviewId, closeModal } = useReviewInfoModalStore();
  const { data: reviews, isLoading } = useGetMyReviews({ page: 0, size: 10 });

  if (isLoading) return <LoadingState message="로딩 중..." />;
  if (!reviews?.content?.length)
    return <EmptyState message="작성한 리뷰가 없습니다." />;

  return (
    <>
      <SectionWrapper>
        <ReviewList reviews={reviews.content} />
      </SectionWrapper>

      {isOpen && modalType && (
        <ReviewInfoModal
          type={modalType}
          onClose={closeModal}
          reviewId={reviewId}
        />
      )}
    </>
  );
}
