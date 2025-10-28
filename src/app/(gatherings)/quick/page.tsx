import FilterPopover from "@/components/widget/filters/FilterPopover";
import { LocationSelect } from "@/components/widget/filters/LocationSelect";
import SortBySelector from "@/components/widget/filters/SortBySelector";
import { CreateGatheringButton } from "@/components/widget/gatherings/CreateGatheringButton/CreateGatheringButton";
import { EGatheringType } from "@/lib/types/gatherings";

import QuickGatheringCardList from "./_components/QuickGatheringCardList";

export default function QuickGatheringListPage() {
  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        {/* 필터 */}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-2 sm:gap-x-4">
          <LocationSelect />
          <SortBySelector />
          <FilterPopover type={EGatheringType.QUICK} />
        </div>

        {/* 모임 만들기 버튼 */}
        <CreateGatheringButton type="quick" />
      </div>

      {/* 모임 목록 */}
      <QuickGatheringCardList />
    </>
  );
}
