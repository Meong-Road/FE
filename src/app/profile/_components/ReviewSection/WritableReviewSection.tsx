"use client";

import { EmptyState, ErrorState } from "@/components/common";
import InfiniteScroll from "@/components/InfiniteScroll";
import GatheringCardItem from "@/components/widget/gatherings/GatheringCardItem/GatheringCardItem";
import GatheringCardItemSkeleton from "@/components/widget/gatherings/GatheringCardItem/GatheringCardItemSkeleton";
import { useGetInfiniteReviewableGatherings } from "@/hooks/queries/reviews";

export default function WritableReviewSection() {
  const infiniteQueryResult = useGetInfiniteReviewableGatherings(12, [
    "createdAt",
    "desc",
  ]);

  return (
    <InfiniteScroll
      {...infiniteQueryResult}
      render={(gathering) => (
        <GatheringCardItem key={gathering.id} gathering={gathering} as="li" />
      )}
      renderSkeleton={() => <GatheringCardItemSkeleton />}
      renderOnEmpty={() => (
        <EmptyState message="리뷰를 작성할 수 있는 모임이 없어요" />
      )}
      renderOnError={() => (
        <ErrorState message="모임 목록을 불러오는데 실패했습니다." />
      )}
    />
  );
}
