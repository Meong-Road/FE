"use client";

import Link from "next/link";

import { EmptyState, ListContainer, SectionWrapper } from "@/components/common";
import InfiniteScroll from "@/components/InfiniteScroll";
import { QuickGatheringCard } from "@/components/widget/gatherings/QuickGatheringCard";
import { RegularGatheringCard } from "@/components/widget/gatherings/RegularGatheringCard";
import RegularGatheringCardSkeleton from "@/components/widget/gatherings/RegularGatheringCard/RegularGatheringCardSkeleton";
import { useGetInfiniteMyGatherings } from "@/hooks/queries/gatherings";
import { DEFAULT_LIST_OPTIONS } from "@/lib/constants/option";
import { EGatheringType } from "@/lib/types/gatherings";
import { getGatheringDetailPath } from "@/lib/utils/gathering";

export default function CreatedSection() {
  const {
    data: gatherings,
    isPending,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetInfiniteMyGatherings(DEFAULT_LIST_OPTIONS);

  if (gatherings?.length === 0)
    return <EmptyState message="만든 모임이 없습니다." />;

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
