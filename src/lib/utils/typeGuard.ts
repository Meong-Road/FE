import {
  QuickGatheringFormSchema,
  RegularGatheringFormSchema,
} from "@/hooks/gathering/schemas";

import { SEOUL_DISTRICTS } from "../constants/location";
import {
  GatheringType,
  QuickGatheringType,
  RegularGatheringType,
} from "../types/gatherings";
import { LocationParamType } from "../types/reviews";

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

export const isLocationParamType = (
  location: string | null,
): location is LocationParamType => {
  if (location === null) return true;
  return SEOUL_DISTRICTS.some((l) => l === location);
};

export function isQuickGatheringForm(
  data: QuickGatheringFormSchema | RegularGatheringFormSchema,
): data is QuickGatheringFormSchema {
  return "dataTime" in data;
}

export function isRegularGatheringForm(
  data: QuickGatheringFormSchema | RegularGatheringFormSchema,
): data is RegularGatheringFormSchema {
  return "days" in data;
}
