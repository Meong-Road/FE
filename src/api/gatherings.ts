import { PaginationRequest, PaginationResponse } from "@/mocks/data/common";
import { QuickGatheringType } from "@/utils/types/gathering";

export const getRegularGatherings = async ({
  page,
  pageSize,
}: PaginationRequest): Promise<PaginationResponse<QuickGatheringType>> => {
  const response = await fetch(
    `/api/gatherings?type=REGULAR&page=${page}&pageSize=${pageSize}`,
  );
  return response.json();
};

export const getQuickGatherings = async ({
  page,
  pageSize,
}: PaginationRequest): Promise<PaginationResponse<QuickGatheringType>> => {
  const response = await fetch(
    `/api/gatherings?type=QUICK&page=${page}&pageSize=${pageSize}`,
  );
  return response.json();
};
