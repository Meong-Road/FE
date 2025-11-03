import { SortOptionValue } from "@/lib/constants/option";

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

export interface PaginatedRes<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

export interface PaginationReq {
  page: number;
  size: number;
  sort: SortOptionValue;
}

export type PaginationOptions = Omit<PaginationReq, "page">;
