"use client";

import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { QuickGatheringCard } from "@/components/widget/QuickGatheringCard";
import { RegularGatheringCard } from "@/components/widget/RegularGatheringCard";
import { useGetInfiniteBookmarkedGatherings } from "@/hooks/queries/gatherings";
import { EGatheringType } from "@/lib/types/gatherings";

export default function FavoritesList({
  currentTab,
}: {
  currentTab: EGatheringType;
}) {
  const { ref, inView } = useInView();

  const {
    data: gatherings,
    isPending,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetInfiniteBookmarkedGatherings(currentTab);

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView, fetchNextPage]);

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>데이터를 불러오는 데 실패했습니다</div>;

  return (
    <ul className="mt-9 grid grid-cols-1 gap-8">
      {gatherings.map((gathering) =>
        gathering.type === EGatheringType.REGULAR ? (
          <RegularGatheringCard key={gathering.id} gathering={gathering} />
        ) : (
          <QuickGatheringCard key={gathering.id} gathering={gathering} />
        ),
      )}
      {isFetchingNextPage && <div>Loading...</div>}
      {hasNextPage && !isFetchingNextPage && (
        <div ref={ref} className="h-4"></div>
      )}
    </ul>
  );
}
