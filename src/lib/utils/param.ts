import { SEOUL_ALL } from "../constants/location";
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
