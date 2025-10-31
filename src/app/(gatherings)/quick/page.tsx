import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import FilterPopover from "@/components/widget/filters/FilterPopover";
import { LocationSelect } from "@/components/widget/filters/LocationSelect";
import SortBySelector from "@/components/widget/filters/SortBySelector";
import { CreateGatheringButton } from "@/components/widget/gatherings/CreateGatheringButton/CreateGatheringButton";
import { getInfiniteQuickGatheringsOptions } from "@/hooks/queries/gatherings/useGetInfiniteQuickGatherings";
import { DEFAULT_LIST_OPTIONS } from "@/lib/constants/option";
import { EGatheringType } from "@/lib/types/gatherings";

import QuickGatheringCardList from "./_components/QuickGatheringCardList";

export const dynamic = "force-dynamic";

export default async function QuickGatheringListPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery(
    getInfiniteQuickGatheringsOptions(DEFAULT_LIST_OPTIONS),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
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
    </HydrationBoundary>
  );
}
