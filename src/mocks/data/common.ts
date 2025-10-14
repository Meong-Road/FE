import { PaginatedRes, PaginationReq, Response } from "@/api/types/common";

export const createSuccessRes = <T>(data: T): Response<T> => {
  return {
    success: true,
    code: 200,
    errorCode: null,
    message: "성공",
    result: data,
  };
};

export const createPaginatedRes = <T>(
  data: T[],
  { page, size }: Pick<PaginationReq, "page" | "size">,
): Response<PaginatedRes<T>> => {
  return createSuccessRes({
    content: data.slice(0, size),
    totalPages: Math.ceil(data.length / size),
    totalElements: data.length,
    last: false,
    page,
    size,
  });
};
