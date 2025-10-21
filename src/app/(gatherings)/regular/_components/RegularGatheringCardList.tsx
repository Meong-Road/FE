import InfiniteScroll from "@/components/InfiniteScroll";
import { RegularGatheringCard } from "@/components/widget/gatherings/RegularGatheringCard";
import RegularGatheringCardSkeleton from "@/components/widget/gatherings/RegularGatheringCard/RegularGatheringCardSkeleton";
import { useGetInfiniteRegularGatherings } from "@/hooks/queries/gatherings";
import { DEFAULT_LIST_OPTIONS } from "@/lib/constants/option";

export default function RegularGatheringCardList() {
  const {
    data: gatherings,
    isPending,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetInfiniteRegularGatherings(DEFAULT_LIST_OPTIONS);

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
          <RegularGatheringCard key={gathering.id} gathering={gathering} />
        )}
        renderSkeleton={() => <RegularGatheringCardSkeleton />}
        textOnEmpty="정기 모임 데이터가 없어요"
        textOnError="정기 모임 데이터를 불러오는 중 오류가 발생했어요"
      />
    </ul>
  );
}
