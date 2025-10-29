"use client";

import GatheringReviewCardList from "./GatheringReview/GatheringReviewCardList";
import ReviewPagination from "./GatheringReview/ReviewPagination";

export default function GatheringReviewSection() {
  return (
    <section>
      <div className="mb-2 ml-2 text-lg font-semibold">리뷰</div>
      <GatheringReviewCardList className="px-7 py-7" />
      <ReviewPagination />
    </section>
  );
}
