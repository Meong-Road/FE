"use client";

import FilterPopover from "@/components/widget/filters/FilterPopover";
import { LocationSelect } from "@/components/widget/filters/LocationSelect";
import SortBySelector from "@/components/widget/filters/SortBySelector";
import { CreateGatheringButton } from "@/components/widget/gatherings/CreateGatheringButton/CreateGatheringButton";
import { EGatheringType } from "@/lib/types/gatherings";

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
          <CreateGatheringButton type="regular" />
        </div>

        {/* 모임 목록 */}
        <RegularGatheringCardList />
      </div>
    </>
  );
}
