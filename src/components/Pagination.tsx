"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Pagination as UIPagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { usePagenation } from "@/hooks";
import { ELLIPSIS } from "@/hooks/pagenation/_utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

function PageButton({
  page,
  currentPage,
  onClick,
}: {
  page: number;
  currentPage: number;
  onClick: (page: number) => void;
}) {
  const isActive = currentPage === page;

  return (
    <PaginationItem>
      <PaginationLink
        onClick={() => onClick(page - 1)}
        isActive={isActive}
        className={
          isActive
            ? "h-9 w-9 cursor-pointer rounded-lg bg-[#FEF0C7] font-semibold text-gray-900 hover:bg-[#FEE5A0] sm:h-10 sm:w-10"
            : "h-9 w-9 cursor-pointer rounded-lg text-gray-400 hover:bg-gray-100 sm:h-10 sm:w-10"
        }
      >
        {page}
      </PaginationLink>
    </PaginationItem>
  );
}

function NavButton({
  direction,
  disabled,
  onClick,
}: {
  direction: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
}) {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;

  return (
    <PaginationItem>
      <Button
        variant="ghost"
        size="icon"
        onClick={onClick}
        disabled={disabled}
        className="h-9 w-9 rounded-lg hover:bg-gray-100 disabled:opacity-30 sm:h-10 sm:w-10"
      >
        <Icon className="h-4 w-4 text-gray-600 sm:h-5 sm:w-5" />
      </Button>
    </PaginationItem>
  );
}

export function Pagination({ currentPage, totalPages }: PaginationProps) {
  const {
    currentPageNumber,
    mobilePageNumbers,
    desktopPageNumbers,
    canGoPrev,
    canGoNext,
    goToPage,
    goToPrev,
    goToNext,
  } = usePagenation({ currentPage, totalPages });

  if (totalPages <= 1) {
    return null;
  }

  return (
    <UIPagination className="mt-8">
      <PaginationContent className="flex gap-1 sm:gap-2">
        <NavButton direction="prev" disabled={!canGoPrev} onClick={goToPrev} />

        <div className="flex gap-1 sm:hidden">
          {mobilePageNumbers.map((page, idx) =>
            page === ELLIPSIS ? (
              <PaginationItem key={`ellipsis-${idx}`}>
                <PaginationEllipsis className="h-9 w-9 text-gray-400" />
              </PaginationItem>
            ) : (
              <PageButton
                key={page}
                page={page}
                currentPage={currentPageNumber}
                onClick={goToPage}
              />
            ),
          )}
        </div>

        <div className="hidden gap-2 sm:flex">
          {desktopPageNumbers.map((page, idx) =>
            page === ELLIPSIS ? (
              <PaginationItem key={`ellipsis-${idx}`}>
                <PaginationEllipsis className="h-10 w-10 text-gray-400" />
              </PaginationItem>
            ) : (
              <PageButton
                key={page}
                page={page}
                currentPage={currentPageNumber}
                onClick={goToPage}
              />
            ),
          )}
        </div>

        <NavButton direction="next" disabled={!canGoNext} onClick={goToNext} />
      </PaginationContent>
    </UIPagination>
  );
}
