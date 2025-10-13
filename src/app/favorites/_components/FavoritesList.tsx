"use client";

import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import QuickGatheringCard from "@/app/_components/QuickGatheringCard";
import RegularGatheringCard from "@/app/_components/RegularGatheringCard";
import { useGetInfiniteBookmarkedGatherings } from "@/hooks/queries/gathering";

export default function FavoritesList({ currentTab }: { currentTab: string }) {
  const { ref, inView } = useInView();

  const {
    data,
    isPending,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetInfiniteBookmarkedGatherings(currentTab);

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView, fetchNextPage]);

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>데이터를 불러오는 데 실패했습니다</div>;

  const gatherings = data?.pages.flatMap((page) => page.data) || [];

  return (
    <ul className="mt-9 grid grid-cols-1 gap-8">
      {gatherings.map((gathering) =>
        currentTab === "regular" ? (
          <RegularGatheringCard key={gathering.id} gathering={gathering} />
        ) : (
          <QuickGatheringCard key={gathering.id} gathering={gathering} />
        ),
      )}
      {isFetchingNextPage && <div>Loading...</div>}
      {hasNextPage && !isFetchingNextPage && (
        <div ref={ref} className="h-4"></div>
      )}
    </ul>
  );
}
