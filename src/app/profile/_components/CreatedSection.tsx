"use client";

import { ListContainer, SectionWrapper } from "@/components/common";
import InfiniteScroll from "@/components/InfiniteScroll";
import { QuickGatheringCard } from "@/components/widget/gatherings/QuickGatheringCard";
import { RegularGatheringCard } from "@/components/widget/gatherings/RegularGatheringCard";
import RegularGatheringCardSkeleton from "@/components/widget/gatherings/RegularGatheringCard/RegularGatheringCardSkeleton";
import { useGetInfiniteMyGatherings } from "@/hooks/queries/gatherings";
import { DEFAULT_LIST_OPTIONS } from "@/lib/constants/option";
import { EGatheringType } from "@/lib/types/gatherings";

export default function CreatedSection() {
  const {
    data: gatherings,
    isPending,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetInfiniteMyGatherings(DEFAULT_LIST_OPTIONS);

  return (
    <SectionWrapper>
      <ListContainer>
        <InfiniteScroll
          data={gatherings}
          render={(gathering) =>
            gathering.type === EGatheringType.REGULAR ? (
              <RegularGatheringCard key={gathering.id} gathering={gathering} />
            ) : (
              <QuickGatheringCard key={gathering.id} gathering={gathering} />
            )
          }
          renderSkeleton={() => <RegularGatheringCardSkeleton />}
          isPending={isPending}
          isError={isError}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          textOnEmpty="아직 생성한 모임이 없어요"
          textOnError="생성한 모임을 불러오는 중 오류가 발생했어요"
        />
      </ListContainer>
    </SectionWrapper>
  );
}
