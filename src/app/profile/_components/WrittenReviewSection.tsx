"use client";

import {
  EmptyState,
  ErrorState,
  ListContainer,
  LoadingState,
  SectionWrapper,
} from "@/components/common";
import { ReviewCard } from "@/components/ReviewCard";
import { useGetMyReviews } from "@/hooks/queries/reviews";
import { ReviewType } from "@/lib/types/reviews";
import { processReviewInfo } from "@/lib/utils/review";

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
          profileImage={review.user?.image || ""}
          reviewId={review.id}
          score={review.score}
          nickName={review.user?.nickName || ""}
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

const ReviewList = ({ reviews }: { reviews: ReviewType[] }) => {
  if (reviews.length === 0)
    return <EmptyState message="아직 등록된 리뷰가 없어요" minHeight="200px" />;

  return (
    <ListContainer>
      {reviews.map((review) => (
        <ReviewItem key={review.id} review={processReviewInfo(review)} />
      ))}
    </ListContainer>
  );
};

export default function WrittenReviewSection() {
  const {
    data: reviews,
    isPending,
    isError,
  } = useGetMyReviews({ page: 0, size: 10 });

  if (isPending)
    return (
      <LoadingState message="리뷰를 불러오고 있어요..." minHeight="200px" />
    );
  if (!reviews || isError)
    return (
      <ErrorState message="리뷰를 불러오는데 실패했습니다." minHeight="200px" />
    );

  return (
    <SectionWrapper>
      <ReviewList reviews={reviews.content} />
    </SectionWrapper>
  );
}
