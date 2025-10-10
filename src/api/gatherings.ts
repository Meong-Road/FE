import {
  EGatheringType,
  GatheringType,
  QuickGatheringType,
  RegularGatheringType,
} from "@/lib/types/gathering";
import {
  PaginationRequest,
  PaginationResponse,
  Response,
} from "@/mocks/data/common";

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

export async function getIsLiked(
  id: GatheringType["id"],
): Promise<Response<{ isLiked: boolean }>> {
  const response = await fetch(`/api/gatherings/${id}/bookmarks`);
  return response.json();
}

export async function like(id: GatheringType["id"]): Promise<Response<void>> {
  const response = await fetch(`/api/gatherings/${id}/bookmarks`, {
    method: "POST",
  });
  return response.json();
}

export async function cancelLike(
  id: GatheringType["id"],
): Promise<Response<void>> {
  const response = await fetch(`/api/gatherings/${id}/bookmarks`, {
    method: "DELETE",
  });
  return response.json();
}

export async function getGatheringDetail({
  id,
}: {
  id: GatheringType["id"];
}): Promise<Response<GatheringType>> {
  const response = await fetch(`/api/gatherings/${id}`);
  return response.json();
}
