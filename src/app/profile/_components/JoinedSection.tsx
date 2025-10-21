"use client";

import {
  EmptyState,
  ErrorState,
  ListContainer,
  SectionWrapper,
} from "@/components/common";
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
          renderOnEmpty={() => (
            <EmptyState message="아직 참석한 모임이 없어요" minHeight="200px" />
          )}
          renderOnError={() => (
            <ErrorState
              message="참석한 모임을 불러오는 중 오류가 발생했어요"
              minHeight="200px"
            />
          )}
        />
      </ListContainer>
    </SectionWrapper>
  );
}
