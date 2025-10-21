"use client";

import { EmptyState, ErrorState } from "@/components/common";
import InfiniteScroll from "@/components/InfiniteScroll";
import {
  QuickGatheringCard,
  QuickGatheringCardSkeleton,
} from "@/components/widget/gatherings/QuickGatheringCard";
import { useGetInfiniteQuickGatherings } from "@/hooks/queries/gatherings/useGetInfiniteQuickGatherings";
import { DEFAULT_LIST_OPTIONS } from "@/lib/constants/option";

export default function QuickGatheringCardList() {
  const infiniteQueryResult =
    useGetInfiniteQuickGatherings(DEFAULT_LIST_OPTIONS);

  return (
    <ul className="grid grid-cols-1 gap-4">
      <InfiniteScroll
        {...infiniteQueryResult}
        render={(gathering) => (
          <QuickGatheringCard key={gathering.id} gathering={gathering} />
        )}
        renderSkeleton={() => <QuickGatheringCardSkeleton />}
        renderOnEmpty={() => (
          <EmptyState message="아직 등록된 번개 모임이 없어요" />
        )}
        renderOnError={() => (
          <ErrorState message="등록된 번개 모임을 불러오는 중 오류가 발생했어요" />
        )}
      />
    </ul>
  );
}
