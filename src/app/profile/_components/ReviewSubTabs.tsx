"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { Tab } from "@/components/Tab";
import { PATH } from "@/lib/constants/path";
import { REVIEW_SUB_TAB_LIST, REVIEW_SUB_TABS } from "@/lib/constants/profile";

export default function ReviewSubTabs() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "reviews";
  const currentReviewTab =
    searchParams.get("reviewTab") || REVIEW_SUB_TABS.WRITABLE.value;

  const handleTabChange = (value: string | boolean) => {
    const stringValue = String(value);
    router.push(
      `${PATH.MY_PROFILE}?tab=${currentTab}&reviewTab=${stringValue}`,
    );
  };

  const radioOptions = REVIEW_SUB_TAB_LIST.map((tab) => ({
    id: `review-tab-${tab.value}`,
    label: tab.label,
    value: tab.value,
  }));

  return (
    <div className="flex">
      <div className="flex">
        <Tab.Radio
          name="review-tabs"
          options={radioOptions}
          value={currentReviewTab}
          onChange={handleTabChange}
        />
      </div>
    </div>
  );
}
