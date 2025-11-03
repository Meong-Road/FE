"use client";

import { EmptyState, ErrorState, SectionWrapper } from "@/components/common";
import { Pagination } from "@/components/common/Pagination";
import { ReviewCardSkeletonList } from "@/components/ReviewCard";
import { ReviewList } from "@/components/widget/reviews";
import { useGetMyReviews } from "@/hooks/queries/reviews";

export default function WrittenReviewSection() {
  const {
    data: reviews,
    isPending,
    isError,
  } = useGetMyReviews({ page: 0, size: 10 });

  if (isPending) {
    return <ReviewCardSkeletonList count={3} />;
  }
  if (!reviews || isError)
    return <ErrorState message="리뷰를 불러오는데 실패했습니다." />;

  if (reviews.content.length === 0)
    return <EmptyState message="작성한 리뷰가 없어요" />;

  return (
    <SectionWrapper>
      <ReviewList reviews={reviews.content} />
      <Pagination
        currentPage={reviews.page || 0}
        totalPages={reviews.totalPages || 0}
        scroll={true}
      />
    </SectionWrapper>
  );
}
