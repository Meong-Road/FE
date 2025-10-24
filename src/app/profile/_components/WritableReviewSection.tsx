"use client";

import { useMemo } from "react";

import WritableGatheringCardItem from "@/app/profile/_components/WritableGatheringCardItem";
import WritableGatheringCardItemSkeleton from "@/app/profile/_components/WritableGatheringCardItemSkeleton";
import { EmptyState, ErrorState } from "@/components/common";
import InfiniteScroll from "@/components/InfiniteScroll";
import { useAuth } from "@/hooks";
import { useGetInfiniteJoinedGatherings } from "@/hooks/queries/gatherings";
import { useGetMyPets } from "@/hooks/queries/pets";
import { EGatheringState, EGatheringType } from "@/lib/types/gatherings";
import { getGatheringState } from "@/lib/utils/gathering";

export default function WritableReviewSection() {
  const { user } = useAuth();
  const { data: pets } = useGetMyPets({ enabled: !!user });
  const hasPet = pets && pets.length > 0;

  const infiniteQueryResult = useGetInfiniteJoinedGatherings({
    size: 12,
    sort: ["createdAt", "desc"],
  });

  // 작성 가능한 리뷰만 필터링 (REGULAR, FIXED_GATHERING)
  const filteredGatherings = useMemo(() => {
    if (!infiniteQueryResult.data) return [];

    return infiniteQueryResult.data.filter((gathering) => {
      if (gathering.type !== EGatheringType.REGULAR) return false;
      const state = getGatheringState(gathering, !!user, !!hasPet);
      if (state !== EGatheringState.FIXED_GATHERING) return false;
      return true;
    });
  }, [infiniteQueryResult.data, user, hasPet]);

  return (
    <InfiniteScroll
      {...infiniteQueryResult}
      data={filteredGatherings}
      render={(gathering) => (
        <WritableGatheringCardItem
          key={gathering.id}
          gathering={gathering}
          as="li"
        />
      )}
      renderSkeleton={() => <WritableGatheringCardItemSkeleton />}
      renderOnEmpty={() => (
        <EmptyState message="리뷰를 작성할 수 있는 모임이 없어요" />
      )}
      renderOnError={() => (
        <ErrorState message="모임 목록을 불러오는데 실패했습니다." />
      )}
    />
  );
}
