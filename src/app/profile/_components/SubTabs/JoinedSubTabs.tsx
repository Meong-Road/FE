"use client";

import { useRouter } from "next/navigation";

import { Tab } from "@/components/Tab";
import { useSearchParamsState } from "@/hooks/useSearchParamsState";
import { PATH } from "@/lib/constants/path";
import {
  JOINED_SUB_TAB_LIST,
  JOINED_SUB_TABS,
  PROFILE_TABS,
} from "@/lib/constants/profile";

const radioOptions = JOINED_SUB_TAB_LIST.map((tab) => ({
  id: `joined-tab-${tab.value}`,
  label: tab.label,
  value: tab.value,
}));

export default function JoinedSubTabs() {
  const router = useRouter();
  const currentTab = useSearchParamsState({
    tab: PROFILE_TABS.JOINED.value,
    joinedTab: JOINED_SUB_TABS.RECRUITING.value,
  });

  const handleTabChange = (joinedTab: string | boolean) => {
    router.push(
      `${PATH.MY_PROFILE}?tab=${currentTab.tab}&joinedTab=${String(joinedTab)}`,
      {
        scroll: false,
      },
    );
  };

  return (
    <Tab.Radio
      name="joined-tabs"
      options={radioOptions}
      value={currentTab.joinedTab}
      onChange={handleTabChange}
    />
  );
}
