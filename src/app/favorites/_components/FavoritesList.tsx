"use client";

import InfiniteScroll from "@/components/InfiniteScroll";
import {
  QuickGatheringCard,
  QuickGatheringCardSkeleton,
} from "@/components/widget/gatherings/QuickGatheringCard";
import { RegularGatheringCard } from "@/components/widget/gatherings/RegularGatheringCard";
import RegularGatheringCardSkeleton from "@/components/widget/gatherings/RegularGatheringCard/RegularGatheringCardSkeleton";
import { useGetInfiniteBookmarkedGatherings } from "@/hooks/queries/gatherings";
import { useSearchParamsState } from "@/hooks/useSearchParamsState";
import { EGatheringType, GatheringType } from "@/lib/types/gatherings";

export default function FavoritesList() {
  const { tab } = useSearchParamsState({ tab: "regular" });
  const isQuickTab = tab === "quick";

  const infiniteQueryResult = useGetInfiniteBookmarkedGatherings(
    isQuickTab ? EGatheringType.QUICK : EGatheringType.REGULAR,
  );

  const renderGathering = (gathering: GatheringType) => {
    return gathering.type === EGatheringType.QUICK ? (
      <QuickGatheringCard key={gathering.id} gathering={gathering} />
    ) : (
      <RegularGatheringCard key={gathering.id} gathering={gathering} />
    );
  };

  const renderSkeleton = () => {
    return isQuickTab ? (
      <QuickGatheringCardSkeleton />
    ) : (
      <RegularGatheringCardSkeleton />
    );
  };

  return (
    <div className="mt-9 grid grid-cols-1 gap-8">
      <InfiniteScroll
        {...infiniteQueryResult}
        render={renderGathering}
        renderSkeleton={renderSkeleton}
        textOnEmpty={`찜한 ${isQuickTab ? "번개 모임" : "정기 모임"}이 없어요`}
        textOnError={`찜한 ${isQuickTab ? "번개 모임" : "정기 모임"}을 불러오는 중 오류가 발생했어요`}
      />
    </div>
  );
}
