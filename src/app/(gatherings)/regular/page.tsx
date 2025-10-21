"use client";

import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import FilterPopover from "@/components/widget/filters/FilterPopover";
import { LocationSelect } from "@/components/widget/filters/LocationSelect";
import SortBySelector from "@/components/widget/filters/SortBySelector";
import { PATH } from "@/lib/constants/path";
import { EGatheringType } from "@/lib/types/gatherings";
import { cn } from "@/lib/utils";

import RegularGatheringCardList from "./_components/RegularGatheringCardList";

export default function RegularGatheringListPage() {
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
            className={cn(buttonVariants({ size: "xl" }))}
          >
            + 모임 만들기
          </Link>
        </div>

        {/* 모임 목록 */}
        <RegularGatheringCardList />
      </div>
    </>
  );
}
