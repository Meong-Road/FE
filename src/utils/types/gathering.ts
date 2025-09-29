export interface GatheringType {
  id: number;
  type: "QUICK" | "REGULAR";
  name: string;
  description: string;
  registrationEnd: string; // date
  location: string;
  participantCount: number;
  capacity: number;
  image: string | null;
  isPetRequired: boolean;
  isParticipating: boolean;
  canceledAt: string | null; // date
  hostId?: number;
}

export interface QuickGatheringType extends GatheringType {
  dateTime: string; // date
}

export interface RegularGatheringType extends GatheringType {
  day: string[];
  time: number;
}
