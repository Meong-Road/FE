import { PaginationReq } from "@/api/types/common";

export const DEFAULT_LIST_OPTIONS: Pick<PaginationReq, "size" | "sort"> = {
  size: 12,
  sort: ["createdAt", "desc"],
};
