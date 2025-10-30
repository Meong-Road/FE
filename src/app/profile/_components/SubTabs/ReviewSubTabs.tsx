"use client";

import { useRouter } from "next/navigation";

import { Tab } from "@/components/Tab";
import { useSearchParamsState } from "@/hooks/useSearchParamsState";
import { PATH } from "@/lib/constants/path";
import {
  PROFILE_TABS,
  REVIEW_SUB_TAB_LIST,
  REVIEW_SUB_TABS,
} from "@/lib/constants/profile";

const radioOptions = REVIEW_SUB_TAB_LIST.map((tab) => ({
  id: `review-tab-${tab.value}`,
  label: tab.label,
  value: tab.value,
}));

export default function ReviewSubTabs() {
  const router = useRouter();
  const currentTab = useSearchParamsState({
    tab: PROFILE_TABS.REVIEWS.value,
    reviewTab: REVIEW_SUB_TABS.WRITABLE.value,
  });

  const handleTabChange = (reviewTab: string | boolean) => {
    router.push(
      `${PATH.MY_PROFILE}?tab=${currentTab.tab}&reviewTab=${String(reviewTab)}`,
      {
        scroll: false,
      },
    );
  };

  return (
    <Tab.Radio
      name="review-tabs"
      options={radioOptions}
      value={currentTab.reviewTab}
      onChange={handleTabChange}
    />
  );
}
