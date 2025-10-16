import {
  GatheringType,
  QuickGatheringType,
  RegularGatheringType,
} from "../types/gatherings";

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
