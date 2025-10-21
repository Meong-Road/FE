"use client";

import Link from "next/link";

import { ListContainer, SectionWrapper } from "@/components/common";
import InfiniteScroll from "@/components/InfiniteScroll";
import { QuickGatheringCard } from "@/components/widget/gatherings/QuickGatheringCard";
import { RegularGatheringCard } from "@/components/widget/gatherings/RegularGatheringCard";
import RegularGatheringCardSkeleton from "@/components/widget/gatherings/RegularGatheringCard/RegularGatheringCardSkeleton";
import { useGetInfiniteJoinedGatherings } from "@/hooks/queries/gatherings";
import { DEFAULT_LIST_OPTIONS } from "@/lib/constants/option";
import { EGatheringType } from "@/lib/types/gatherings";
import { getGatheringDetailPath } from "@/lib/utils/gathering";

export default function JoinedSection() {
  const {
    data: gatherings,
    isPending,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetInfiniteJoinedGatherings(DEFAULT_LIST_OPTIONS);

  return (
    <SectionWrapper>
      <ListContainer>
        <InfiniteScroll
          data={gatherings}
          render={(gathering) => (
            <Link key={gathering.id} href={getGatheringDetailPath(gathering)}>
              {gathering.type === EGatheringType.REGULAR ? (
                <RegularGatheringCard gathering={gathering} />
              ) : (
                <QuickGatheringCard gathering={gathering} />
              )}
            </Link>
          )}
          renderSkeleton={() => <RegularGatheringCardSkeleton />}
          textOnEmpty="참석한 모임이 없습니다."
          textOnError="참석한 모임 조회 실패"
          isPending={isPending}
          isError={isError}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      </ListContainer>
    </SectionWrapper>
  );
}
