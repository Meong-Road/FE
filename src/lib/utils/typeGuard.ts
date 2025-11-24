import {
  QuickGatheringFormSchema,
  RegularGatheringFormSchema,
} from "@/hooks/gathering/schemas";

import { SEOUL_DISTRICTS } from "../constants/location";
import { ESortBy, SORT_OPTIONS_MAP } from "../constants/option";
import {
  GatheringType,
  QuickGatheringType,
  RegularGatheringType,
} from "../types/gatherings";
import { DistrictParam } from "../types/reviews";

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
): location is DistrictParam => {
  if (location === null) return true;
  return SEOUL_DISTRICTS.some((l) => l === location);
};

export function isQuickGatheringForm(
  data: QuickGatheringFormSchema | RegularGatheringFormSchema,
): data is QuickGatheringFormSchema {
  return "dateTime" in data;
}

export function isRegularGatheringForm(
  data: QuickGatheringFormSchema | RegularGatheringFormSchema,
): data is RegularGatheringFormSchema {
  return "days" in data;
}

export function isSortOptionKey(sort: string): sort is ESortBy {
  return Object.keys(SORT_OPTIONS_MAP).includes(sort);
}
