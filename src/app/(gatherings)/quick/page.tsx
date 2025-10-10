"use client";

import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Link from "next/link";

import { useGetInfiniteQuickGatherings } from "@/hooks/queries/gathering";

import LocationSelect from "../_components/LocationSelect";
import SortBySelector from "../_components/SortBySelector";

import FilterPopover from "./_components/FilterPopover";
import QuickGatheringCard from "./_components/QuickGatheringCard";

export default function QuickGatheringListPage() {
  const { ref, inView } = useInView();
  const {
    data: gatherings,
    isPending,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetInfiniteQuickGatherings();

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView, fetchNextPage]);

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>에러</div>;

  return (
    <div className="px-2">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-6 flex items-center justify-between">
          {/* 필터 */}
          <div className="flex items-center gap-4">
            <LocationSelect />
            <SortBySelector />
            <FilterPopover />
          </div>

          {/* 모임 만들기 버튼 */}
          <Link
            href="/gatherings/quick/create"
            className="bg-primary rounded-md px-4 py-2 text-white"
          >
            + 모임 만들기
          </Link>
        </div>

        {/* 모임 목록 */}
        <ul className="grid grid-cols-1 gap-6">
          {gatherings.map((gathering) => (
            <QuickGatheringCard key={gathering.id} gathering={gathering} />
          ))}
        </ul>
        {isFetchingNextPage && <div>Loading...</div>}
      </div>

      {hasNextPage && !isFetchingNextPage && <div ref={ref} className="h-4" />}
    </div>
  );
}
