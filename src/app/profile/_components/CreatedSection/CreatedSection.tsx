"use client";

import {
  EmptyState,
  ErrorState,
  ListContainer,
  SectionWrapper,
} from "@/components/common";
import InfiniteScroll from "@/components/InfiniteScroll";
import GatheringCardItem from "@/components/widget/gatherings/GatheringCardItem/GatheringCardItem";
import GatheringCardItemSkeleton from "@/components/widget/gatherings/GatheringCardItem/GatheringCardItemSkeleton";
import { useGetInfiniteMyGatherings } from "@/hooks/queries/gatherings";
import { DEFAULT_LIST_OPTIONS } from "@/lib/constants/option";
import { PATH } from "@/lib/constants/path";

export default function CreatedSection() {
  const infiniteQueryResult = useGetInfiniteMyGatherings(DEFAULT_LIST_OPTIONS);

  return (
    <SectionWrapper>
      <ListContainer>
        <InfiniteScroll
          {...infiniteQueryResult}
          render={(gathering) => (
            <GatheringCardItem
              key={gathering.id}
              gathering={gathering}
              href={PATH.DETAIL(gathering.id, gathering.type)}
              as="li"
            />
          )}
          renderSkeleton={() => <GatheringCardItemSkeleton />}
          renderOnEmpty={() => (
            <EmptyState message="아직 생성한 모임이 없어요" />
          )}
          renderOnError={() => (
            <ErrorState message="생성한 모임을 불러오는 중 오류가 발생했어요" />
          )}
        />
      </ListContainer>
    </SectionWrapper>
  );
}
