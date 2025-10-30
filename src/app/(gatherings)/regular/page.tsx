import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import FilterPopover from "@/components/widget/filters/FilterPopover";
import { LocationSelect } from "@/components/widget/filters/LocationSelect";
import SortBySelector from "@/components/widget/filters/SortBySelector";
import { CreateGatheringButton } from "@/components/widget/gatherings/CreateGatheringButton/CreateGatheringButton";
import { getInfiniteRegularGatheringsOptions } from "@/hooks/queries/gatherings/useGetInfiniteRegularGatherings";
import { DEFAULT_LIST_OPTIONS } from "@/lib/constants/option";
import { EGatheringType } from "@/lib/types/gatherings";

import RegularGatheringCardList from "./_components/RegularGatheringCardList";

export default async function RegularGatheringListPage() {
  const queryClient = new QueryClient();

  // 실시간 업데이트가 필요한 대시보드 데이터
  await queryClient.prefetchInfiniteQuery(
    getInfiniteRegularGatheringsOptions(DEFAULT_LIST_OPTIONS),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="mb-6 flex items-center justify-between">
        {/* 필터 */}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-2 sm:gap-x-4">
          <LocationSelect />
          <SortBySelector />
          <FilterPopover type={EGatheringType.REGULAR} />
        </div>

        {/* 모임 만들기 버튼 */}
        <CreateGatheringButton type="regular" />
      </div>

      {/* 모임 목록 */}
      <RegularGatheringCardList />
    </HydrationBoundary>
  );
}
