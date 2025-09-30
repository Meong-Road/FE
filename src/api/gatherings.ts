import {
  EGatheringType,
  QuickGatheringType,
  RegularGatheringType,
} from "@/lib/types/gathering";
import { PaginationRequest, PaginationResponse } from "@/mocks/data/common";

export async function getRegularGatherings({
  page,
  pageSize,
  sortBy,
  sortOrder,
}: PaginationRequest): Promise<PaginationResponse<RegularGatheringType>> {
  const response = await fetch(
    `/api/gatherings?type=${EGatheringType.REGULAR}&page=${page}&pageSize=${pageSize}&sortBy=${sortBy}&sortOrder=${sortOrder}`,
  );
  return response.json();
}

export async function getQuickGatherings({
  page,
  pageSize,
  sortBy,
  sortOrder,
}: PaginationRequest): Promise<PaginationResponse<QuickGatheringType>> {
  const response = await fetch(
    `/api/gatherings?type=${EGatheringType.QUICK}&page=${page}&pageSize=${pageSize}&sortBy=${sortBy}&sortOrder=${sortOrder}`,
  );
  return response.json();
}
