import { SEOUL_DISTRICTS } from "@/lib/constants/location";

export type LocationType = (typeof SEOUL_DISTRICTS)[number];

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

export enum EGatheringType {
  QUICK = "QUICK",
  REGULAR = "REGULAR",
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
  sort: string;
}
