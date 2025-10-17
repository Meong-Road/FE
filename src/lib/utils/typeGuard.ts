import { SEOUL_DISTRICTS } from "../constants/location";
import {
  GatheringType,
  QuickGatheringType,
  RegularGatheringType,
} from "../types/gatherings";
import { LocationType } from "../types/reviews";

export const isQuickGathering = (
  gathering: GatheringType,
): gathering is QuickGatheringType => {
  return gathering.type === "QUICK";
};

export const isRegularGathering = (
  gathering: GatheringType,
): gathering is RegularGatheringType => {
  return gathering.type === "REGULAR";
};

export const isLocationType = (location: string): location is LocationType => {
  return SEOUL_DISTRICTS.includes(location as (typeof SEOUL_DISTRICTS)[number]);
};
