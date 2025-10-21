"use client";

import { ListContainer, SectionWrapper } from "@/components/common";
import InfiniteScroll from "@/components/InfiniteScroll";
import { QuickGatheringCard } from "@/components/widget/gatherings/QuickGatheringCard";
import { RegularGatheringCard } from "@/components/widget/gatherings/RegularGatheringCard";
import RegularGatheringCardSkeleton from "@/components/widget/gatherings/RegularGatheringCard/RegularGatheringCardSkeleton";
import { useGetInfiniteJoinedGatherings } from "@/hooks/queries/gatherings";
import { DEFAULT_LIST_OPTIONS } from "@/lib/constants/option";
import { EGatheringType } from "@/lib/types/gatherings";

export default function JoinedSection() {
  const infiniteQueryResult =
    useGetInfiniteJoinedGatherings(DEFAULT_LIST_OPTIONS);

  return (
    <SectionWrapper>
      <ListContainer>
        <InfiniteScroll
          {...infiniteQueryResult}
          render={(gathering) =>
            gathering.type === EGatheringType.REGULAR ? (
              <RegularGatheringCard key={gathering.id} gathering={gathering} />
            ) : (
              <QuickGatheringCard key={gathering.id} gathering={gathering} />
            )
          }
          renderSkeleton={() => <RegularGatheringCardSkeleton />}
          textOnEmpty="참석한 모임이 없습니다."
          textOnError="참석한 모임 조회 실패"
        />
      </ListContainer>
    </SectionWrapper>
  );
}
