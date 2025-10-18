import { PATH } from "@/lib/constants/path";
import { GatheringType } from "@/lib/types/gatherings";

import { formatDate, formatDays } from "./dateTime";
import { isRegularGathering } from "./typeGuard";

/**
 * 모임의 상세 페이지 경로를 반환
 */
export const getGatheringDetailPath = (gathering: GatheringType): string => {
  return isRegularGathering(gathering)
    ? PATH.REGULAR_DETAIL(gathering.id)
    : PATH.QUICK_DETAIL(gathering.id);
};

/**
 * 모임의 날짜 정보를 포맷팅하여 반환
 */
export const getGatheringDateInfo = (gathering: GatheringType): string => {
  return isRegularGathering(gathering)
    ? formatDays(gathering.days)
    : formatDate(gathering.dateTime);
};

/**
 * 모임 정보를 가공하여 반환
 */
export const processGatheringInfo = (gathering: GatheringType) => {
  return {
    ...gathering,
    detailPath: getGatheringDetailPath(gathering),
    dateInfo: getGatheringDateInfo(gathering),
    isRegular: isRegularGathering(gathering),
  };
};
