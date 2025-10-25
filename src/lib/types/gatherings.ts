import { LocationType } from "./reviews";
import { UserType } from "./user";

export enum EGatheringType {
  QUICK = "QUICK",
  REGULAR = "REGULAR",
}

export enum EGatheringState {
  AUTH_REQUIRED = "AUTH_REQUIRED", // 로그인이 필요한 경우
  REGISTRATION_END_PASSED = "REGISTRATION_END_PASSED", // 마감 기한이 지난 경우
  FIXED_GATHERING = "FIXED_GATHERING", // 모임 개설이 확정된 경우
  CAPACITY_FULL = "CAPACITY_FULL", // 모임 정원이 가득 찬 경우
  CANCELED = "CANCELED", // 모임이 취소된 경우
  PET_REQUIRED = "PET_REQUIRED", // 반려견 필수 여부
  GENERAL = "GENERAL", // 일반적인 경우
}

export interface CommonGatheringType {
  id: number;
  name: string;
  description: string;
  registrationEnd: string; // date
  location: LocationType;
  participantCount: number;
  capacity: number;
  image: string | null;
  isPetRequired: boolean;
  isParticipating: boolean;
  canceledAt: string | null; // date
  hostId?: number;
}

export interface QuickGatheringType extends CommonGatheringType {
  type: EGatheringType.QUICK;
  dateTime: string; // date
}

export interface RegularGatheringType extends CommonGatheringType {
  type: EGatheringType.REGULAR;
  days: string;
}

export type GatheringType = QuickGatheringType | RegularGatheringType;

export interface BookmarkType {
  type: EGatheringType;
  page: number;
  size: number;
  sort: string[];
}

export interface ParticipantsType {
  userId: UserType["id"];
  gatheringId: GatheringType["id"];
  joinedAt: string; // date
  user: UserType;
}

// 모임 생성 요청을 위한 공통 필드
export interface CommonCreateGatheringType {
  type: EGatheringType;
  name: string;
  description: string | undefined;
  location: string; // TODO: 웅덕님 타입 수정 필요하시면 해주세요
  capacity: number;
  image: string | null;
  isPetRequired: boolean;
  registrationEnd: string;
}

// 번개모임 생성 요청
export interface CreateQuickGatheringType extends CommonCreateGatheringType {
  type: EGatheringType.QUICK;
  dateTime: { hour: number; minute: number };
}

// 정기모임 생성 요청
export interface CreateRegularGatheringType extends CommonCreateGatheringType {
  type: EGatheringType.REGULAR;
  days: string[];
}

export type CreateGatheringType =
  | CreateQuickGatheringType
  | CreateRegularGatheringType;
