"use client";

import GatheringReviewList from "./GatheringReview/GatheringReviewList";

export default function GatheringReviewSection() {
  return (
    <section>
      <div className="mb-2 ml-2 text-lg font-semibold">리뷰</div>
      <GatheringReviewList className="px-7 py-7" />
    </section>
  );
}
