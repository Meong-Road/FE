"use client";

import { Pagination } from "@/components/Pagination";
import { ReviewCardSkeletonList } from "@/components/ReviewCard";
import { useGetReviews } from "@/hooks/queries/reviews";

import { ReviewList } from "./ReviewList";

interface ReviewListContainerProps {
  location: string;
  page: number;
}

export function ReviewListContainer({
  location,
  page,
}: ReviewListContainerProps) {
  const {
    data: reviews,
    isPending,
    isError,
  } = useGetReviews({
    location: location || null,
    page,
    size: 10,
    sort: "createdAt,desc",
  });

  if (isPending) {
    return <ReviewCardSkeletonList count={10} />;
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-red-500">리뷰를 불러오는 중 오류가 발생했습니다.</p>
      </div>
    );
  }

  const content = reviews.result?.content || [];
  const totalPages = reviews.result?.totalPages || 0;
  const currentPage = reviews.result?.page || 0;

  return (
    <section>
      <ReviewList reviews={content} />
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </section>
  );
}
