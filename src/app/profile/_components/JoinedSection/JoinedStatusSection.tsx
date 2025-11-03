"use client";

import { GatheringStatus } from "@/api/types/gatherings";
import {
  EmptyState,
  ErrorState,
  ListContainer,
  SectionWrapper,
} from "@/components/common";
import InfiniteScroll from "@/components/InfiniteScroll";
import GatheringCardItem from "@/components/widget/gatherings/GatheringCardItem/GatheringCardItem";
import GatheringCardItemSkeleton from "@/components/widget/gatherings/GatheringCardItem/GatheringCardItemSkeleton";
import { useGetInfiniteJoinedGatherings } from "@/hooks/queries/gatherings";
import { DEFAULT_LIST_OPTIONS } from "@/lib/constants/option";
import { PATH } from "@/lib/constants/path";

type JoinedStatusSectionProps = {
  status: GatheringStatus;
};

const getEmptyMessage = (status: GatheringStatus) => {
  switch (status) {
    case "RECRUITING":
      return "개설 예정인 모임이 없어요";
    case "CONFIRMED":
      return "개설 확정된 모임이 없어요";
    case "CANCELED":
      return "취소된 모임이 없어요";
    case "COMPLETED":
      return "마감된 모임이 없어요";
    default:
      return "참석한 모임이 없어요";
  }
};

export default function JoinedStatusSection({
  status,
}: JoinedStatusSectionProps) {
  const infiniteQueryResult = useGetInfiniteJoinedGatherings(
    DEFAULT_LIST_OPTIONS,
    status,
  );

  return (
    <SectionWrapper>
      <ListContainer>
        <InfiniteScroll
          {...infiniteQueryResult}
          render={(gathering) => (
            <GatheringCardItem
              key={gathering.id}
              href={PATH.DETAIL(gathering.id, gathering.type)}
              gathering={gathering}
              as="li"
              isReviewCard={status === "CONFIRMED" || status === "COMPLETED"}
            />
          )}
          renderSkeleton={() => <GatheringCardItemSkeleton />}
          renderOnEmpty={() => <EmptyState message={getEmptyMessage(status)} />}
          renderOnError={() => (
            <ErrorState message="참석한 모임을 불러오는 중 오류가 발생했어요" />
          )}
        />
      </ListContainer>
    </SectionWrapper>
  );
}
