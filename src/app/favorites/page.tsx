"use client";

import { useSearchParamsState } from "@/hooks/useSearchParmasState";
import { FAVORITES_TAB_LIST } from "@/lib/constants/favorites";
import { PATH } from "@/lib/constants/path";

import { Tab } from "../profile/_components/Tab";

import FavoritesList from "./_components/FavoritesList";

const DEFAULT_TAB = "regular";

export default function Favorites() {
  const { tab } = useSearchParamsState({ tab: DEFAULT_TAB });

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
