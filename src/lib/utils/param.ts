import { PaginationReq } from "@/api/types/common";
import {
  QuickGatheringFilters,
  RegularGatheringFilters,
} from "@/api/types/gatherings";

import { SEOUL_ALL } from "../constants/location";
import {
  EIsClosed,
  EPetRequired,
  ESortBy,
  IS_CLOSED_OPTIONS_MAP,
  PET_REQUIRED_OPTIONS_MAP,
  SORT_OPTIONS_MAP,
  SortOptionValue,
} from "../constants/option";
import { LocationParamType } from "../types/reviews";

import { isLocationParamType } from "./typeGuard";

/**
 * URL 파라미터에서 location 값을 안전하게 LocationType으로 변환합니다
 * @param locationParam URL에서 가져온 location 파라미터 (string | null)
 * @returns LocationType
 */
export const parseLocationParam = (
  locationParam: string | null,
): LocationParamType => {
  if (!locationParam || locationParam === SEOUL_ALL) return null;
  return isLocationParamType(locationParam) ? locationParam : null;
};

export function parseGatheringFilterParam(
  params: Record<string, string | null | undefined>,
  isRegular: true,
): Partial<RegularGatheringFilters> & Partial<PaginationReq>;
export function parseGatheringFilterParam(
  params: Record<string, string | null | undefined>,
  isRegular?: false,
): Partial<QuickGatheringFilters> & Partial<PaginationReq>;
export function parseGatheringFilterParam(
  params: Record<string, string | null | undefined>,
  isRegular = false,
): (Partial<QuickGatheringFilters> | Partial<RegularGatheringFilters>) &
  Partial<PaginationReq> {
  const record: (
    | Partial<QuickGatheringFilters>
    | Partial<RegularGatheringFilters>
  ) &
    Partial<PaginationReq> = {};
  if (params.location) {
    record.location = parseLocationParam(params.location);
  }
  if (params.sort) {
    record.sort = SORT_OPTIONS_MAP[params.sort as ESortBy]
      .value as SortOptionValue;
  }
  if (params.isClosed) {
    record.isClosed = IS_CLOSED_OPTIONS_MAP[params.isClosed as EIsClosed].value;
  }
  if (params.isPetRequired) {
    record.isPetRequired =
      PET_REQUIRED_OPTIONS_MAP[params.isPetRequired as EPetRequired].value;
  }
  if (isRegular) {
    if (params.dayOfWeek) {
      (record as Partial<RegularGatheringFilters>).dayOfWeek = JSON.parse(
        params.dayOfWeek,
      );
    }
  } else {
    if (params.startDate) {
      (record as Partial<QuickGatheringFilters>).startDate =
        `${params.startDate}T00:00:00`;
    }
    if (params.endDate) {
      (record as Partial<QuickGatheringFilters>).endDate =
        `${params.endDate}T23:59:59`;
    }
  }
  return record;
}
