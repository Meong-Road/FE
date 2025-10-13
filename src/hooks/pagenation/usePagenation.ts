import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { getPageNumbers } from "./_utils";

interface UsePagenationProps {
  currentPage: number; // 0-based
  totalPages: number;
  /**
   * 페이지 이동 시 스크롤 동작 제어
   * - false: 스크롤 위치 유지 (페이지네이션에 권장)
   * - true: 스크롤 최상단으로 이동
   * @default false
   */
  scroll?: boolean;
}

interface UsePagenationReturn {
  currentPageNumber: number; // 1-based
  mobilePageNumbers: number[];
  desktopPageNumbers: number[];
  canGoPrev: boolean;
  canGoNext: boolean;
  goToPage: (page: number) => void;
  goToPrev: () => void;
  goToNext: () => void;
}

export function usePagenation({
  currentPage,
  totalPages,
  scroll = false,
}: UsePagenationProps): UsePagenationReturn {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPageNumber = currentPage + 1;

  const mobilePageNumbers = useMemo(
    () => getPageNumbers(currentPageNumber, totalPages, 1),
    [currentPageNumber, totalPages],
  );

  const desktopPageNumbers = useMemo(
    () => getPageNumbers(currentPageNumber, totalPages, 2),
    [currentPageNumber, totalPages],
  );

  const goToPage = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", page.toString());
      router.push(`${pathname}?${params.toString()}`, { scroll });
    },
    [pathname, router, searchParams, scroll],
  );

  const goToPrev = useCallback(() => {
    if (currentPage > 0) {
      goToPage(currentPage - 1);
    }
  }, [currentPage, goToPage]);

  const goToNext = useCallback(() => {
    if (currentPage < totalPages - 1) {
      goToPage(currentPage + 1);
    }
  }, [currentPage, totalPages, goToPage]);

  return {
    currentPageNumber,
    mobilePageNumbers,
    desktopPageNumbers,
    canGoPrev: currentPage > 0,
    canGoNext: currentPage < totalPages - 1,
    goToPage,
    goToPrev,
    goToNext,
  };
}
