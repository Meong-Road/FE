"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Pagination as UIPagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";

interface PaginationProps {
  currentPage: number; // 0-index
  totalPages: number;
}

export function Pagination({ currentPage, totalPages }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  if (totalPages <= 1) {
    return null;
  }

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <UIPagination className="mt-8">
      <PaginationContent className="gap-2">
        {/* 이전 버튼 */}
        <PaginationItem>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 0}
            className="h-9 gap-1 px-3"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">이전</span>
          </Button>
        </PaginationItem>

        {/* 페이지 번호 */}
        {totalPages <= 10 ? (
          // 10페이지 이하: i+1 (1부터 시작)전부 표시
          Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                onClick={() => handlePageChange(page - 1)}
                isActive={currentPage + 1 === page}
                className={
                  currentPage + 1 === page
                    ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                    : "hover:bg-accent hover:text-accent-foreground"
                }
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))
        ) : (
          // 11페이지 이상: 간단한 축약
          <>
            {/* 첫 페이지 */}
            <PaginationItem>
              <PaginationLink
                onClick={() => handlePageChange(0)}
                isActive={currentPage === 0}
                className={
                  currentPage === 0
                    ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                    : "hover:bg-accent hover:text-accent-foreground"
                }
              >
                1
              </PaginationLink>
            </PaginationItem>

            {/* 왼쪽 ellipsis */}
            {currentPage > 2 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            {/* 현재 페이지 (첫/마지막이 아닐 때만) */}
            {currentPage > 0 && currentPage < totalPages - 1 && (
              <PaginationItem>
                <PaginationLink
                  isActive
                  className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                >
                  {currentPage + 1}
                </PaginationLink>
              </PaginationItem>
            )}

            {/* 오른쪽 ellipsis */}
            {currentPage < totalPages - 3 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            {/* 마지막 페이지 */}
            <PaginationItem>
              <PaginationLink
                onClick={() => handlePageChange(totalPages - 1)}
                isActive={currentPage === totalPages - 1}
                className={
                  currentPage === totalPages - 1
                    ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                    : "hover:bg-accent hover:text-accent-foreground"
                }
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        {/* 다음 버튼 */}
        <PaginationItem>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages - 1}
            className="h-9 gap-1 px-3"
          >
            <span className="hidden sm:inline">다음</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </UIPagination>
  );
}
