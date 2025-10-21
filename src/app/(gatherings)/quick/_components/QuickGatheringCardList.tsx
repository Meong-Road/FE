"use client";

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
        textOnEmpty="번개 모임 데이터가 없어요"
        textOnError="번개 모임 데이터를 불러오는 중 오류가 발생했어요"
      />
    </ul>
  );
}
