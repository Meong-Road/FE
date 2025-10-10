import { Tab } from "../profile/_components/Tab";

import FavoritesList from "./_components/FavoritesList";

interface FavoritesProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

export default async function Favorites({ searchParams }: FavoritesProps) {
  const resolvedSearchParams = await searchParams;
  const currentTab =
    typeof resolvedSearchParams?.tab === "string"
      ? resolvedSearchParams.tab
      : "regular";

  return (
    <section className="mx-auto max-w-[1280px]">
      <Tab>
        <Tab.List>
          <Tab.Item
            href="/favorites?tab=regular"
            isActive={currentTab === "regular"}
          >
            정기 모임
          </Tab.Item>
          <Tab.Item
            href="/favorites?tab=quick"
            isActive={currentTab === "quick"}
          >
            번개 모임
          </Tab.Item>
        </Tab.List>
      </Tab>

      <FavoritesList currentTab={currentTab} />
    </section>
  );
}
