export const ELLIPSIS = -1;

/**
 * 페이지네이션에 표시할 페이지 번호 배열을 생성하는 함수
 * @param current - 현재 페이지 (1부터 시작)
 * @param total - 전체 페이지 수
 * @param siblings - 현재 페이지 양옆에 표시할 페이지 수
 * @returns 표시할 페이지 번호 배열 (ellipsis는 -1로 표시)
 */
export function getPageNumbers(
  current: number,
  total: number,
  siblings: number,
): number[] {
  if (total <= siblings * 2 + 5) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: number[] = [1];
  const start = Math.max(2, current - siblings + 1);
  const end = Math.min(total - 1, current + siblings + 1);

  if (start > 2) {
    pages.push(ELLIPSIS);
  }
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  if (end < total - 1) {
    pages.push(ELLIPSIS);
  }
  if (total > 1) {
    pages.push(total);
  }

  return pages;
}
