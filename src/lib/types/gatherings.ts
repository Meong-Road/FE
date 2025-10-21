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
