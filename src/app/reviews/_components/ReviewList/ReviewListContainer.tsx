"use client";

import { useSearchParams } from "next/navigation";

import { EmptyState, ErrorState, SectionWrapper } from "@/components/common";
import { Pagination } from "@/components/Pagination";
import { ReviewCardSkeletonList } from "@/components/ReviewCard";
import { useGetReviews } from "@/hooks/queries/reviews";
import { DEFAULT_LIST_OPTIONS } from "@/lib/constants/option";
import { parseLocationParam } from "@/lib/utils/param";

import ReviewList from "./ReviewList";

export default function ReviewListContainer() {
  const searchParams = useSearchParams();
  const location = parseLocationParam(searchParams.get("location"));
  const page = Number(searchParams.get("page")) ?? 0;

  const {
    data: reviews,
    isPending,
    isError,
  } = useGetReviews({
    location,
    page,
    ...DEFAULT_LIST_OPTIONS,
  });

  if (isPending) {
    return <ReviewCardSkeletonList count={3} />;
  }

  if (!reviews || isError)
    return (
      <ErrorState message="리뷰를 불러오는데 실패했습니다." minHeight="200px" />
    );

  if (reviews.content.length === 0) {
    return <EmptyState message="해당 지역의 리뷰가 없어요" minHeight="200px" />;
  }

  return (
    <>
      <SectionWrapper>
        <ReviewList reviews={reviews.content} />
      </SectionWrapper>
      <Pagination
        currentPage={reviews.page || 0}
        totalPages={reviews.totalPages || 2}
        scroll={true}
      />
    </>
  );
}
