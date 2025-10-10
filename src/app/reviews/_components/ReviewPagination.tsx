"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { Pagination } from "@/components/Pagination";

interface ReviewPaginationProps {
  currentPage: number;
  totalPages: number;
}

export function ReviewPagination({
  currentPage,
  totalPages,
}: ReviewPaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`/reviews?${params.toString()}`);
  };

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
    />
  );
}
