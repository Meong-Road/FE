import { Tab } from "@/components/Tab";
import { useSearchParamsState } from "@/hooks/useSearchParamsState";
import { PATH } from "@/lib/constants/path";
import { PROFILE_TAB_LIST, PROFILE_TABS } from "@/lib/constants/profile";

export function ProfileTabs() {
  const { tab } = useSearchParamsState({ tab: PROFILE_TABS.JOINED.value });

  return (
    <Tab className="mt-8 sm:mt-16">
      <Tab.List>
        {PROFILE_TAB_LIST.map((tabItem) => (
          <Tab.Item
            key={tabItem.value}
            href={`${PATH.MY_PROFILE}?tab=${tabItem.value}`}
            isActive={tab === tabItem.value}
          >
            {tabItem.label}
          </Tab.Item>
        ))}
      </Tab.List>
    </Tab>
  );
}
