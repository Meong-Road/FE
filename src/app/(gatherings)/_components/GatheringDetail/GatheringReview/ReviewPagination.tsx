import { useState } from "react";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function ReviewPagination() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
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
  );
}
