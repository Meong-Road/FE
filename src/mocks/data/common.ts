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

export type Response<T> = SuccessResponse<T> | ErrorResponse;

interface SuccessResponse<T> {
  success: true;
  code: number;
  message: string;
  result: T;
  errorCode: null;
}

interface ErrorResponse {
  success: false;
  code: null;
  message: string;
  result: null;
  errorCode: string;
}

// ! 변경 필요
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

// !
export interface PaginationReq {
  page: number;
  size: number;
  sort?: string[];
}
