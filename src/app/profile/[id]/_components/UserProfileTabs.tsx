import { useParams } from "next/navigation";

import { Tab } from "@/components/Tab";
import { useSearchParamsState } from "@/hooks/useSearchParamsState";
import { PATH } from "@/lib/constants/path";
import {
  USER_PROFILE_TAB_LIST,
  USER_PROFILE_TABS,
} from "@/lib/constants/profile";

export function UserProfileTabs() {
  const params = useParams();
  const userId = params.id as string;
  const {
    params: { tab },
  } = useSearchParamsState({ tab: USER_PROFILE_TABS.PETS.value });

  return (
    <Tab className="mt-12 sm:mt-16">
      <Tab.List>
        {USER_PROFILE_TAB_LIST.map((tabItem) => (
          <Tab.Item
            key={tabItem.value}
            href={`${PATH.PROFILE(userId)}?tab=${tabItem.value}`}
            isActive={tab === tabItem.value}
          >
            {tabItem.label}
          </Tab.Item>
        ))}
      </Tab.List>
    </Tab>
  );
}
