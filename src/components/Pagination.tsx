interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav
      className="mt-8 flex items-center justify-center gap-2"
      aria-label="페이지네이션"
    >
      {/* 이전 페이지 버튼 */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
        className="rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        aria-label="이전 페이지"
      >
        이전
      </button>

      {/* 페이지 번호 버튼들 */}
      {Array.from({ length: totalPages }, (_, i) => i).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`rounded-md px-3 py-2 text-sm font-medium ${
            currentPage === page
              ? "bg-primary text-white"
              : "border border-gray-300 text-gray-700 hover:bg-gray-50"
          }`}
          aria-label={`${page + 1}페이지`}
          aria-current={currentPage === page ? "page" : undefined}
        >
          {page + 1}
        </button>
      ))}

      {/* 다음 페이지 버튼 */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages - 1}
        className="rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        aria-label="다음 페이지"
      >
        다음
      </button>
    </nav>
  );
}
