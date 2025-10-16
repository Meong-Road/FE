import { PaginatedRes, PaginationReq } from "@/api/types/common";

export const PAGINATION_DATA = <T>(
  data: T[],
  { page, size }: Pick<PaginationReq, "page" | "size">,
): PaginatedRes<T> => {
  return {
    content: data.slice(0, size),
    totalPages: Math.ceil(data.length / size),
    totalElements: data.length,
    last: false,
    page,
    size,
  };
};
