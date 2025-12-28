"use client";

import { Tab } from "@/components/Tab";
import { useSearchParamsState } from "@/hooks/useSearchParamsState";
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
  const {
    params: { tab, joinedTab },
    setParams,
  } = useSearchParamsState({
    tab: PROFILE_TABS.JOINED.value,
    joinedTab: JOINED_SUB_TABS.RECRUITING.value,
  });

  const handleTabChange = (joinedTab: string | boolean) => {
    setParams({
      tab: tab ?? PROFILE_TABS.JOINED.value,
      joinedTab: String(joinedTab),
    });
  };

  return (
    <Tab.Radio
      name="joined-tabs"
      options={radioOptions}
      value={joinedTab}
      onChange={handleTabChange}
    />
  );
}
