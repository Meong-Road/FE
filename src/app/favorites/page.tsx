import { PATH } from "@/lib/constants/path";
import { EGatheringType } from "@/lib/types/gatherings";

import { Tab } from "../profile/_components/Tab";

import FavoritesList from "./_components/FavoritesList";

interface FavoritesProps {
  searchParams?: Promise<Record<string, string | undefined>>;
}

export default async function Favorites({ searchParams }: FavoritesProps) {
  const resolvedSearchParams = await searchParams;
  const tabParam = resolvedSearchParams?.tab ?? "regular";
  const currentTab =
    tabParam === "quick" ? EGatheringType.QUICK : EGatheringType.REGULAR;

  return (
    <section>
      <Tab>
        <Tab.List>
          <Tab.Item
            href={`${PATH.FAVORITES}?tab=regular`}
            isActive={currentTab === EGatheringType.REGULAR}
          >
            정기 모임
          </Tab.Item>
          <Tab.Item
            href={`${PATH.FAVORITES}?tab=quick`}
            isActive={currentTab === EGatheringType.QUICK}
          >
            번개 모임
          </Tab.Item>
        </Tab.List>
      </Tab>

      <FavoritesList currentTab={currentTab} />
    </section>
  );
}
