"use client";

import { useSearchParams } from "next/navigation";

import { Pagination } from "@/components/Pagination";
import { ReviewCardSkeletonList } from "@/components/ReviewCard";
import { useGetReviews } from "@/hooks/queries/reviews";
import { isLocationType } from "@/lib/utils/typeGuard";

import ReviewList from "./ReviewList";

export default function ReviewListContainer() {
  const searchParams = useSearchParams();
  const location = (() => {
    const locationParam = searchParams.get("location");
    if (!locationParam || !isLocationType(locationParam)) return "서울 전체";
    return locationParam;
  })();
  const page = Number(searchParams.get("page")) ?? 0;

  const {
    data: reviews,
    isPending,
    isError,
  } = useGetReviews({
    location: isLocationType(location) ? location : "서울 전체",
    page,
    size: 10,
    sort: ["createdAt", "desc"],
  });

  if (isPending) {
    return <ReviewCardSkeletonList count={10} />;
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-red-500">리뷰를 불러오는 중 오류가 발생했습니다.</p>
      </div>
    );
  }

  return (
    <>
      <ReviewList reviews={reviews.result?.content || []} />
      <Pagination
        currentPage={reviews.result?.page || 0}
        totalPages={reviews.result?.totalPages || 0}
        scroll={true}
      />
    </>
  );
}
