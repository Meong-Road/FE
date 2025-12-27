"use client";

import { Tab } from "@/components/Tab";
import { useSearchParamsState } from "@/hooks/useSearchParamsState";
import {
  CREATED_SUB_TAB_LIST,
  CREATED_SUB_TABS,
  PROFILE_TABS,
} from "@/lib/constants/profile";

const radioOptions = CREATED_SUB_TAB_LIST.map((tab) => ({
  id: `created-tab-${tab.value}`,
  label: tab.label,
  value: tab.value,
}));

export default function CreatedSubTabs() {
  const {
    params: { tab, createdTab },
    setParams,
  } = useSearchParamsState({
    tab: PROFILE_TABS.CREATED.value,
    createdTab: CREATED_SUB_TABS.RECRUITING.value,
  });

  const handleTabChange = (createdTab: string | boolean) => {
    setParams({
      tab: tab ?? PROFILE_TABS.CREATED.value,
      createdTab: String(createdTab),
    });
  };

  return (
    <Tab.Radio
      name="created-tabs"
      options={radioOptions}
      value={createdTab}
      onChange={handleTabChange}
    />
  );
}
