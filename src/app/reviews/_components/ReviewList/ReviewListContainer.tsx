"use client";

import { EmptyState, ErrorState, SectionWrapper } from "@/components/common";
import { Pagination } from "@/components/common/Pagination";
import { ReviewCardSkeletonList } from "@/components/ReviewCard";
import { ReviewList } from "@/components/widget/reviews";
import { useGetReviews } from "@/hooks/queries/reviews";
import { useSearchParamsState } from "@/hooks/useSearchParamsState";
import { SEOUL_ALL } from "@/lib/constants/location";
import { DEFAULT_LIST_OPTIONS } from "@/lib/constants/option";
import { parseLocationParam } from "@/lib/utils/param";

export default function ReviewListContainer() {
  const Params = useSearchParamsState({ location: SEOUL_ALL, page: "0" });
  const location = parseLocationParam(Params.location as string);
  const page = Number(Params.page);

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
    return <ErrorState message="리뷰를 불러오는데 실패했습니다." />;

  if (location && reviews.content.length === 0) {
    return <EmptyState message={`${location}에 등록된 리뷰가 없어요`} />;
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
