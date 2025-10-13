"use client";

import React, { useEffect, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

import { getMyBookmarkedGatherings } from "@/api/gatherings";
import QuickGatheringCard from "@/app/_components/QuickGatheringCard";
import RegularGatheringCard from "@/app/_components/RegularGatheringCard";
import { EGatheringType } from "@/lib/types/gathering";

export default function FavoritesList({ currentTab }: { currentTab: string }) {
  const observerRef = useRef<HTMLDivElement>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["bookmarkedGatherings", currentTab],
      queryFn: ({ pageParam }) =>
        getMyBookmarkedGatherings({
          type:
            currentTab === "regular"
              ? EGatheringType.REGULAR
              : EGatheringType.QUICK,
          page: Number(pageParam),
          size: 10,
          sort: "createdAt",
        }),
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages) =>
        lastPage.hasNext ? allPages.length : undefined,
    });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1 },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);

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

      <div ref={observerRef} className="h-10">
        {isFetchingNextPage && (
          <div className="text-accent-foreground py-4 text-center">
            로딩 중...
          </div>
        )}
      </div>
    </ul>
  );
}
