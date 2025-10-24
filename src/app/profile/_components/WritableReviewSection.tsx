"use client";

import WritableGatheringCardItem from "@/app/profile/_components/WritableGatheringCardItem";
import WritableGatheringCardItemSkeleton from "@/app/profile/_components/WritableGatheringCardItemSkeleton";
import { EmptyState, ErrorState } from "@/components/common";
import InfiniteScroll from "@/components/InfiniteScroll";
import { useGetInfiniteJoinedGatherings } from "@/hooks/queries/gatherings";

export default function WritableReviewSection() {
  const infiniteQueryResult = useGetInfiniteJoinedGatherings({
    size: 12,
    sort: ["createdAt", "desc"],
  });

  return (
    <InfiniteScroll
      {...infiniteQueryResult}
      render={(gathering) => (
        <WritableGatheringCardItem
          key={gathering.id}
          gathering={gathering}
          as="li"
        />
      )}
      renderSkeleton={() => <WritableGatheringCardItemSkeleton />}
      renderOnEmpty={() => (
        <EmptyState message="리뷰를 작성할 수 있는 모임이 없어요" />
      )}
      renderOnError={() => (
        <ErrorState message="모임 목록을 불러오는데 실패했습니다." />
      )}
    />
  );
}
