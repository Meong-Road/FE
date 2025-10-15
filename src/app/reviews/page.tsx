"use client";

import { useSearchParams } from "next/navigation";

import { Pagination } from "@/components/Pagination";
import { useGetReviewDashboard, useGetReviews } from "@/hooks/queries/reviews";

import { ReviewsPageSkeleton } from "./_components/Skeleton/reviewsPageSkeleton";
import { LocationSelect, ReviewDashboard, ReviewList } from "./_components";

function ReviewsContent() {
  const searchParams = useSearchParams();
  const location = searchParams.get("location") ?? "서울 전체";
  const page = Number(searchParams.get("page")) ?? 0;

  const {
    data: reviews,
    isPending: isReviewsPending,
    isError: isReviewsError,
  } = useGetReviews({
    location,
    page,
    size: 10,
    sort: ["createdAt", "desc"],
  });

  const {
    data: DashboardInfo,
    isPending: isDashboardPending,
    isError: isDashboardError,
  } = useGetReviewDashboard({
    location,
  });

  console.log(reviews);
  console.log(DashboardInfo);

  if (isReviewsPending || isDashboardPending) {
    return <ReviewsPageSkeleton />;
  }

  if (isReviewsError || isDashboardError) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-red-500">리뷰를 불러오는 중 오류가 발생했습니다.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <LocationSelect selectedLocation={location} />
      <ReviewDashboard DashboardInfo={DashboardInfo.result} />
      <ReviewList reviews={reviews.result?.content || []} />
      <Pagination
        currentPage={reviews.result?.page || 0}
        totalPages={reviews.result?.totalPages || 0}
        scroll={true}
      />
    </div>
  );
}

export default function ReviewsPage() {
  return (
    <section className="mx-auto w-full max-w-screen-lg px-4">
      <ReviewsContent />
    </section>
  );
}
