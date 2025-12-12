import { PATH } from "@/lib/constants/path";
import { EGatheringState, GatheringType } from "@/lib/types/gatherings";

import { checkIsBefore, formatDate, formatDays } from "./dateTime";
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
  // 인증 여부와 관계없이 먼저 체크: 취소여부, 모집 마감, 인원 마감
  if (gathering.canceledAt !== null) return EGatheringState.CANCELED;
  if (checkIsBefore(gathering.registrationEnd))
    return EGatheringState.REGISTRATION_END_PASSED;
  if (gathering.participantCount >= gathering.capacity)
    return EGatheringState.CAPACITY_FULL;

  // 인증 필요 상태: 로그인 안 한 사용자, 반려견 필수 여부, 모임 개설 확정
  if (!isAuthenticated) return EGatheringState.AUTH_REQUIRED;
  if (gathering.isPetRequired && !hasPet) return EGatheringState.PET_REQUIRED;
  if (gathering.participantCount >= 5) return EGatheringState.FIXED_GATHERING;

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

export const checkIsCanceledGatheringState = (state: EGatheringState) => {
  return [
    EGatheringState.CANCELED, // 취소된 모임
  ].includes(state);
};
