"use client";

import { useSearchParams } from "next/navigation";

import { useGetReviewDashboard } from "@/hooks/queries/reviews";

import { ReviewDashboardSkeleton } from "../Skeleton/ReviewDashboardSkeleton";

import ReviewDashboard from "./ReviewDashboard";

export default function ReviewDashboardContainer() {
  const searchParams = useSearchParams();
  const location = searchParams.get("location") ?? "서울 전체";

  const {
    data: DashboardInfo,
    isPending,
    isError,
  } = useGetReviewDashboard({
    location,
  });

  if (isPending) {
    return <ReviewDashboardSkeleton />;
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center rounded-3xl bg-orange-50 py-10">
        <p className="text-red-500">대시보드를 불러올 수 없습니다.</p>
      </div>
    );
  }

  return <ReviewDashboard DashboardInfo={DashboardInfo.result} />;
}
