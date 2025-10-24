"use client";

import { useSearchParamsState } from "@/hooks/useSearchParamsState";
import { REVIEW_SUB_TABS } from "@/lib/constants/profile";

import ReviewSubTabs from "./ReviewSubTabs";
import WritableReviewSection from "./WritableReviewSection";
import WrittenReviewSection from "./WrittenReviewSection";

export default function ReviewSection() {
  const { reviewTab } = useSearchParamsState({
    reviewTab: REVIEW_SUB_TABS.WRITABLE.value,
  });

  return (
    <div>
      <ReviewSubTabs />
      <div className="mt-6">
        {reviewTab === REVIEW_SUB_TABS.WRITABLE.value ? (
          <WritableReviewSection />
        ) : (
          <WrittenReviewSection />
        )}
      </div>
    </div>
  );
}
