"use client";

import { useSearchParams } from "next/navigation";

import { Pagination } from "@/components/Pagination";
import { ReviewCardSkeletonList } from "@/components/ReviewCard";
import { useGetReviews } from "@/hooks/queries/reviews";

import { LocationSelect, ReviewDashboard, ReviewList } from "./_components";

function ReviewsContent() {
  const searchParams = useSearchParams();
  let location = searchParams.get("location") || "";
  if (location === "서울 전체") {
    location = "";
  }
  const page = Number(searchParams.get("page")) || 0;

  const {
    data: reviews,
    isPending,
    isError,
  } = useGetReviews({
    location: location || null,
    page,
    size: 10,
    sort: "createdAt,desc",
  });

  return (
    <div className="flex flex-col gap-6 pt-6">
      <LocationSelect selectedLocation={location} />

      <ReviewDashboard />

      {isPending && <ReviewCardSkeletonList count={10} />}

      {isError && (
        <div className="flex items-center justify-center py-20">
          <p className="text-red-500">
            리뷰를 불러오는 중 오류가 발생했습니다.
          </p>
        </div>
      )}

      {!isPending && !isError && (
        <>
          <ReviewList reviews={reviews.result?.content || []} />
          <Pagination
            currentPage={reviews.result?.page || 0}
            totalPages={reviews.result?.totalPages || 0}
          />
        </>
      )}
    </div>
  );
}

export default function ReviewsPage() {
  return (
    <section className="mx-auto max-w-screen-lg p-4 pt-22">
      <ReviewsContent />
    </section>
  );
}
