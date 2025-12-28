"use client";

import { Tab } from "@/components/Tab";
import { useSearchParamsState } from "@/hooks/useSearchParamsState";
import { FAVORITES_TAB_LIST } from "@/lib/constants/favorites";
import { PATH } from "@/lib/constants/path";

import FavoritesList from "./_components/FavoritesList";

const DEFAULT_TAB = "regular";

export default function Favorites() {
  const {
    params: { tab },
  } = useSearchParamsState({ tab: DEFAULT_TAB });

  return (
    <section>
      <Tab>
        <Tab.List>
          {FAVORITES_TAB_LIST.map(({ label, value }) => (
            <Tab.Item
              key={value}
              href={`${PATH.FAVORITES}?tab=${value}`}
              isActive={tab === value}
            >
              {label}
            </Tab.Item>
          ))}
        </Tab.List>
      </Tab>
      <FavoritesList />
    </section>
  );
}
