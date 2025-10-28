"use client";

import { EmptyState, ErrorState } from "@/components/common";
import InfiniteScroll from "@/components/InfiniteScroll";
import GatheringCardItem from "@/components/widget/gatherings/GatheringCardItem/GatheringCardItem";
import GatheringCardItemSkeleton from "@/components/widget/gatherings/GatheringCardItem/GatheringCardItemSkeleton";
import { useGetInfiniteQuickGatherings } from "@/hooks/queries/gatherings/useGetInfiniteQuickGatherings";
import { useSearchParamsState } from "@/hooks/useSearchParamsState";
import {
  DEFAULT_LIST_OPTIONS,
  DEFAULT_OPTION_PARAMS,
} from "@/lib/constants/option";
import { PATH } from "@/lib/constants/path";

export default function QuickGatheringCardList() {
  const props = useSearchParamsState(
    DEFAULT_OPTION_PARAMS as Record<string, string>,
  );

  const optionParams = {
    ...DEFAULT_LIST_OPTIONS,
    ...props,
  };

  const infiniteQueryResult = useGetInfiniteQuickGatherings(optionParams);

  return (
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
        <EmptyState message="아직 등록된 번개 모임이 없어요" />
      )}
      renderOnError={() => (
        <ErrorState message="등록된 번개 모임을 불러오는 중 오류가 발생했어요" />
      )}
    />
  );
}
