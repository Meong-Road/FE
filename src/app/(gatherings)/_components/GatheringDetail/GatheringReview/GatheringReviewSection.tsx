"use client";
import { useState } from "react";
import { useParams } from "next/navigation";

import { EmptyState, ErrorState, LoadingState } from "@/components/common";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useGetReviewsByGathering } from "@/hooks/queries/reviews";

function GatheringReviewList() {
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: reviews,
    isPending,
    isError,
  } = useGetReviewsByGathering({
    gatheringId: Number(id),
    page: currentPage,
  });

  if (isPending)
    return (
      <LoadingState message="리뷰를 불러오고 있어요..." minHeight="200px" />
    );
  if (isError || !reviews)
    return (
      <ErrorState
        message="리뷰를 불러오는 중 오류가 발생했어요"
        minHeight="200px"
      />
    );
  if (reviews.length === 0)
    return <EmptyState message="아직 등록된 리뷰가 없어요" minHeight="200px" />;

  return (
    <>
      <Pagination className="mb-10">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          {[...Array(5)].map((_, idx) => (
            <PaginationItem key={`pagination-item-${idx + 1}`}>
              <PaginationLink
                href="#"
                isActive={currentPage === idx + 1}
                onClick={() => setCurrentPage(idx + 1)}
              >
                {idx + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              href="#"
              isActive={currentPage === 9}
              onClick={() => setCurrentPage(9)}
            >
              9
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
}

export default function GatheringReviewSection() {
  return (
    <section>
      <div className="mb-6 text-2xl font-semibold">모임 리뷰 모아보기</div>
      <GatheringReviewList />
    </section>
  );
}
