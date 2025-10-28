import { GatheringFilterParams } from "@/api/types/gatherings";

import { SEOUL_ALL } from "../constants/location";
import {
  IS_CLOSED_OPTIONS_MAP,
  LOCATION_OPTIONS_MAP,
  PET_REQUIRED_OPTIONS_MAP,
  SORT_OPTIONS_MAP,
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

export const getGatheringOptionParams = ({
  location,
  sort,
  isPetRequired,
  isClosed,
  dayOfWeek,
}: GatheringFilterParams) => {
  return {
    location: LOCATION_OPTIONS_MAP[location].value,
    sort: JSON.stringify(SORT_OPTIONS_MAP[sort].value),
    isPetRequired: PET_REQUIRED_OPTIONS_MAP[isPetRequired].value,
    isClosed: IS_CLOSED_OPTIONS_MAP[isClosed].value,
    dayOfWeek: JSON.stringify(dayOfWeek),
  };
};
