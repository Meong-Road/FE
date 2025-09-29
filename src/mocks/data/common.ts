export const PAGINATION_DATA = <T>(
  data: T[],
  { pageSize }: Pick<PaginationRequest, "pageSize">,
) => {
  return {
    data: data.slice(0, pageSize),
    totalPages: Math.ceil(data.length / pageSize),
    totalItems: data.length,
    hasNext: true,
  };
};

export interface PaginationResponse<T> {
  data: T[];
  totalPages: number;
  totalItems: number;
  hasNext: boolean;
}

export interface PaginationRequest {
  page: number;
  pageSize: number;
  sortBy: string;
  sortOrder: string;
}
