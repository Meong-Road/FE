"use client";

import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Link from "next/link";

import { useGetInfiniteRegularGatherings } from "@/hooks/queries/gatherings";

import RegularGatheringCard from "../../_components/RegularGatheringCard";
import LocationSelect from "../_components/LocationSelect";
import SortBySelector from "../_components/SortBySelector";

import FilterPopover from "./_components/FilterPopover";

export default function RegularGatheringListPage() {
  const { ref, inView } = useInView();
  const {
    data: gatherings,
    isPending,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetInfiniteRegularGatherings({});

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView, fetchNextPage]);

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>에러</div>;

  return (
    <>
      <div className="mx-auto max-w-[1280px] px-4">
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
            <RegularGatheringCard key={gathering.id} gathering={gathering} />
          ))}
        </ul>
        {isFetchingNextPage && <div>Loading...</div>}
      </div>

      {hasNextPage && !isFetchingNextPage && <div ref={ref} className="h-4" />}
    </>
  );
}
