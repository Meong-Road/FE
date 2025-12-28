"use client";

import { Tab } from "@/components/Tab";
import { useSearchParamsState } from "@/hooks/useSearchParamsState";
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
  const {
    params: { tab, reviewTab },
    setParams,
  } = useSearchParamsState({
    tab: PROFILE_TABS.REVIEWS.value,
    reviewTab: REVIEW_SUB_TABS.WRITABLE.value,
  });

  const handleTabChange = (reviewTab: string | boolean) => {
    setParams({
      tab: tab ?? PROFILE_TABS.JOINED.value,
      reviewTab: String(reviewTab),
    });
  };

  return (
    <Tab.Radio
      name="review-tabs"
      options={radioOptions}
      value={reviewTab}
      onChange={handleTabChange}
    />
  );
}
