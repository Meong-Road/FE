"use client";
import { useState } from "react";

import { ReviewCard } from "@/components/ReviewCard";
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

export default function GatheringReviewSection() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isPending, isError } = useGetReviewsByGathering({
    gatheringId: 1,
    page: currentPage,
  });

  // TODO 로딩, 에러 처리
  if (isPending) return <div>Loading...</div>;
  if (isError || !data.result) return <div>에러</div>;

  return (
    <section>
      <div className="mb-6 text-2xl font-semibold">모임 리뷰 모아보기</div>
      <ReviewCard className="mb-8 border border-[#ddd] px-12 py-10">
        {data.result.content.map((review, idx) => (
          <>
            <div key={`review-${review.id}`} className="flex flex-col gap-y-6">
              <ReviewCard.Profile
                user={review.user}
                score={3}
                date={review.createdAt}
              />
              <ReviewCard.Comment>{review.comment}</ReviewCard.Comment>
            </div>
            {idx !== data.result.content.length - 1 && (
              <ReviewCard.Divider className="my-6" />
            )}
          </>
        ))}
      </ReviewCard>

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
    </section>
  );
}
