"use client";

import { EmptyState, ErrorState } from "@/components/common";
import InfiniteScroll from "@/components/InfiniteScroll";
import GatheringCardItem from "@/components/widget/gatherings/GatheringCardItem/GatheringCardItem";
import GatheringCardItemSkeleton from "@/components/widget/gatherings/GatheringCardItem/GatheringCardItemSkeleton";
import { useGetInfiniteBookmarkedGatherings } from "@/hooks/queries/gatherings";
import { useSearchParamsState } from "@/hooks/useSearchParamsState";
import { PATH } from "@/lib/constants/path";
import { EGatheringType } from "@/lib/types/gatherings";

export default function FavoritesList() {
  const { tab } = useSearchParamsState({ tab: "regular" });
  const isQuickTab = tab === "quick";

  const infiniteQueryResult = useGetInfiniteBookmarkedGatherings(
    isQuickTab ? EGatheringType.QUICK : EGatheringType.REGULAR,
  );

  return (
    <div className="mt-9 grid grid-cols-1 gap-8">
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
          <EmptyState
            message={`아직 찜한 ${isQuickTab ? "번개 모임" : "정기 모임"}이 없어요`}
          />
        )}
        renderOnError={() => (
          <ErrorState
            message={`찜한 ${isQuickTab ? "번개 모임" : "정기 모임"}을 불러오는 중 오류가 발생했어요`}
          />
        )}
      />
    </div>
  );
}
