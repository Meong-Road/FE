import { SEOUL_DISTRICTS } from "../constants/location";
import {
  GatheringType,
  QuickGatheringType,
  RegularGatheringType,
} from "../types/gatherings";
import { LocationType } from "../types/reviews";

export const isQuickGathering = (
  gathering: GatheringType,
): gathering is QuickGatheringType => {
  return gathering.type === "QUICK";
};

export const isRegularGathering = (
  gathering: GatheringType,
): gathering is RegularGatheringType => {
  return gathering.type === "REGULAR";
};

export const isLocationType = (
  location: string | null,
): location is LocationType => {
  if (!location) return true;
  return SEOUL_DISTRICTS.includes(location as (typeof SEOUL_DISTRICTS)[number]);
};

/**
 * URL 파라미터에서 location 값을 안전하게 LocationType으로 변환합니다
 * @param locationParam URL에서 가져온 location 파라미터 (string | null)
 * @returns LocationType
 */
export const parseLocationParam = (
  locationParam: string | null,
): LocationType => {
  if (!locationParam || locationParam === "서울 전체") {
    return null;
  }

  return isLocationType(locationParam) ? locationParam : null;
};
