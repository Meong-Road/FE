"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

import {
  LocationSelect,
  ReviewCardSkeletonList,
  ReviewDashboard,
  ReviewListContainer,
} from "./_components";

function ReviewsContent() {
  const searchParams = useSearchParams();
  let location = searchParams.get("location") || "";
  if (location === "서울 전체") {
    location = "";
  }
  const page = Number(searchParams.get("page")) || 0;

  return (
    <div className="flex flex-col gap-6 pt-6">
      <LocationSelect selectedLocation={location} />

      <ReviewDashboard />

      <ReviewListContainer location={location} page={page} />
    </div>
  );
}

export default function ReviewsPage() {
  return (
    <section className="mx-auto max-w-screen-lg p-4 pt-22">
      <Suspense fallback={<ReviewCardSkeletonList count={10} />}>
        <ReviewsContent />
      </Suspense>
    </section>
  );
}
