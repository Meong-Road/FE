import { EGatheringState } from "../types/gatherings";

export const GATHERING_STATE_MESSAGE: Record<EGatheringState, string> = {
  [EGatheringState.REGISTRATION_END_PASSED]: "모집 마감된 모임",
  [EGatheringState.FIXED_GATHERING]: "개설 확정된 모임",
  [EGatheringState.CAPACITY_FULL]: "인원 마감된 모임",
  [EGatheringState.CANCELED]: "취소된 모임",
  [EGatheringState.PET_REQUIRED]: "반려견 필수인 모임",
  [EGatheringState.AUTH_REQUIRED]: "로그인이 필요한 기능",
  [EGatheringState.GENERAL]: "모임",
};
