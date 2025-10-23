import { LocationType } from "./reviews";
import { UserType } from "./user";

export enum EGatheringType {
  QUICK = "QUICK",
  REGULAR = "REGULAR",
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
export interface CreateGatheringBase {
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
export interface CreateQuickGatheringReq extends CreateGatheringBase {
  type: EGatheringType.QUICK;
  dateTime: { hour: number; minute: number };
}

// 정기모임 생성 요청
export interface CreateRegularGatheringReq extends CreateGatheringBase {
  type: EGatheringType.REGULAR;
  days: string[];
}

export type CreateGatheringReq =
  | CreateQuickGatheringReq
  | CreateRegularGatheringReq;
