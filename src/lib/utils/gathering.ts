import { PATH } from "@/lib/constants/path";
import { EGatheringState, GatheringType } from "@/lib/types/gatherings";

import { checkIsAfter, formatDate, formatDays } from "./dateTime";
import { isRegularGathering } from "./typeGuard";

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
    detailPath: PATH.DETAIL(gathering.id, gathering.type),
    dateInfo: getGatheringDateInfo(gathering),
    isRegular: isRegularGathering(gathering),
  };
};

/**
 * 모임 상태를 반환
 */
export const getGatheringState = (
  gathering: GatheringType,
  isAuthenticated: boolean,
  hasPet: boolean,
) => {
  if (checkIsAfter(gathering.registrationEnd))
    return EGatheringState.REGISTRATION_END_PASSED;
  if (gathering.participantCount >= 5) return EGatheringState.FIXED_GATHERING;
  if (gathering.participantCount >= gathering.capacity)
    return EGatheringState.CAPACITY_FULL;
  if (gathering.canceledAt !== null) return EGatheringState.CANCELED;
  if (!isAuthenticated) return EGatheringState.AUTH_REQUIRED;
  if (gathering.isPetRequired && !hasPet) return EGatheringState.PET_REQUIRED;
  return EGatheringState.GENERAL;
};

/**
 * 해당 모임의 상태가 마감/취소된 모임인지 확인
 */
export const checkIsClosedGatheringState = (state: EGatheringState) => {
  return [
    EGatheringState.REGISTRATION_END_PASSED, // 모집 마감
    EGatheringState.CAPACITY_FULL, // 인원 마감
    EGatheringState.CANCELED, // 취소된 모임
  ].includes(state);
};
