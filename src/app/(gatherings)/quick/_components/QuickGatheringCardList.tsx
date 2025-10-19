"use client";

import InfiniteScroll from "@/components/InfiniteScroll";
import {
  QuickGatheringCard,
  QuickGatheringCardSkeleton,
} from "@/components/widget/QuickGatheringCard";
import { useGetInfiniteQuickGatherings } from "@/hooks/queries/gatherings/useGetInfiniteQuickGatherings";
import { DEFAULT_LIST_OPTIONS } from "@/lib/constants/option";

export default function QuickGatheringCardList() {
  const {
    data: gatherings,
    isPending,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetInfiniteQuickGatherings(DEFAULT_LIST_OPTIONS);

  return (
    <ul className="grid grid-cols-1 gap-4">
      <InfiniteScroll
        data={gatherings}
        isPending={isPending}
        isError={isError}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        render={(gathering) => (
          <QuickGatheringCard key={gathering.id} gathering={gathering} />
        )}
        renderSkeleton={() => <QuickGatheringCardSkeleton />}
      />
    </ul>
  );
}
