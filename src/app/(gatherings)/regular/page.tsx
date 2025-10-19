"use client";

import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Link from "next/link";

import FilterPopover from "@/components/widget/filters/FilterPopover";
import { LocationSelect } from "@/components/widget/filters/LocationSelect";
import SortBySelector from "@/components/widget/filters/SortBySelector";
import { RegularGatheringCard } from "@/components/widget/gatherings/RegularGatheringCard";
import { useGetInfiniteRegularGatherings } from "@/hooks/queries/gatherings";
import { PATH } from "@/lib/constants/path";
import { EGatheringType } from "@/lib/types/gatherings";

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
      <div>
        <div className="mb-6 flex items-center justify-between">
          {/* 필터 */}
          <div className="flex items-center gap-4">
            <LocationSelect />
            <SortBySelector />
            <FilterPopover type={EGatheringType.REGULAR} />
          </div>

          {/* 모임 만들기 버튼 */}
          <Link
            href={PATH.REGULAR_CREATE}
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
