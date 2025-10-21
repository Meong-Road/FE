import { EmptyState, ErrorState } from "@/components/common";
import InfiniteScroll from "@/components/InfiniteScroll";
import { RegularGatheringCard } from "@/components/widget/gatherings/RegularGatheringCard";
import RegularGatheringCardSkeleton from "@/components/widget/gatherings/RegularGatheringCard/RegularGatheringCardSkeleton";
import { useGetInfiniteRegularGatherings } from "@/hooks/queries/gatherings";
import { DEFAULT_LIST_OPTIONS } from "@/lib/constants/option";

export default function RegularGatheringCardList() {
  const infiniteQueryResult =
    useGetInfiniteRegularGatherings(DEFAULT_LIST_OPTIONS);

  return (
    <ul className="grid grid-cols-1 gap-4">
      <InfiniteScroll
        {...infiniteQueryResult}
        render={(gathering) => (
          <RegularGatheringCard key={gathering.id} gathering={gathering} />
        )}
        renderSkeleton={() => <RegularGatheringCardSkeleton />}
        renderOnEmpty={() => (
          <EmptyState message="아직 등록된 정기 모임이 없어요" />
        )}
        renderOnError={() => (
          <ErrorState message="등록된 정기 모임을 불러오는 중 오류가 발생했어요" />
        )}
      />
    </ul>
  );
}
