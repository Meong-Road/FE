"use client";

import { useRouter } from "next/navigation";

import { Tab } from "@/components/Tab";
import { useSearchParamsState } from "@/hooks/useSearchParamsState";
import { PATH } from "@/lib/constants/path";
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
  const router = useRouter();
  const currentTab = useSearchParamsState({
    tab: PROFILE_TABS.CREATED.value,
    createdTab: CREATED_SUB_TABS.PENDING.value,
  });

  const handleTabChange = (createdTab: string | boolean) => {
    router.push(
      `${PATH.MY_PROFILE}?tab=${currentTab.tab}&createdTab=${String(createdTab)}`,
      {
        scroll: false,
      },
    );
  };

  return (
    <Tab.Radio
      name="created-tabs"
      options={radioOptions}
      value={currentTab.createdTab}
      onChange={handleTabChange}
    />
  );
}
