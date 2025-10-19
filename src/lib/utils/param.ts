import { LocationType } from "../types/reviews";

import { isLocationType } from "./typeGuard";

/**
 * URL 파라미터에서 location 값을 안전하게 LocationType으로 변환합니다
 * @param locationParam URL에서 가져온 location 파라미터 (string | null)
 * @returns LocationType
 */
export const parseLocationParam = (
  locationParam: string | null,
): LocationType => {
  if (!locationParam) {
    return "서울 전체";
  }
  return isLocationType(locationParam) ? locationParam : "서울 전체";
};
