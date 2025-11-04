import { PaginationReq } from "@/api/types/common";

import { LocationType } from "../types/reviews";

export const DEFAULT_LIST_OPTIONS: Pick<PaginationReq, "size" | "sort"> = {
  size: 12,
  sort: ["createdAt", "desc"],
};

export const LOCATION_OPTIONS_MAP: Record<
  LocationType,
  { value?: string; label: string }
> = {
  ["서울 전체"]: { value: undefined, label: "서울 전체" },
  강남구: { value: "강남구", label: "강남구" },
  강동구: { value: "강동구", label: "강동구" },
  강북구: { value: "강북구", label: "강북구" },
  강서구: { value: "강서구", label: "강서구" },
  광진구: { value: "광진구", label: "광진구" },
  구로구: { value: "구로구", label: "구로구" },
  금천구: { value: "금천구", label: "금천구" },
  노원구: { value: "노원구", label: "노원구" },
  도봉구: { value: "도봉구", label: "도봉구" },
  동대문구: { value: "동대문구", label: "동대문구" },
  동작구: { value: "동작구", label: "동작구" },
  마포구: { value: "마포구", label: "마포구" },
  서대문구: { value: "서대문구", label: "서대문구" },
  서초구: { value: "서초구", label: "서초구" },
  성동구: { value: "성동구", label: "성동구" },
  성북구: { value: "성북구", label: "성북구" },
  송파구: { value: "송파구", label: "송파구" },
  양천구: { value: "양천구", label: "양천구" },
  영등포구: { value: "영등포구", label: "영등포구" },
  용산구: { value: "용산구", label: "용산구" },
  은평구: { value: "은평구", label: "은평구" },
  종로구: { value: "종로구", label: "종로구" },
  중구: { value: "중구", label: "중구" },
  중랑구: { value: "중랑구", label: "중랑구" },
};

export const LOCATION_OPTIONS = Object.entries(LOCATION_OPTIONS_MAP).map(
  ([key, option]) => ({
    id: key as LocationType,
    ...option,
  }),
);

export enum ESortBy {
  CREATED_AT = "CREATED_AT",
  REGISTRATION_END = "REGISTRATION_END",
}

export type SortOptionValue = [string, "asc" | "desc"];

export type SortByOption = {
  id: ESortBy;
  value: SortOptionValue;
  label: string;
};

export const SORT_OPTIONS_MAP: Record<
  ESortBy,
  { value: SortOptionValue; label: string }
> = {
  [ESortBy.CREATED_AT]: { value: ["createdAt", "desc"], label: "최신순" },
  [ESortBy.REGISTRATION_END]: {
    value: ["registrationEnd", "asc"],
    label: "마감 임박",
  },
};

export const SORT_OPTIONS: SortByOption[] = [
  {
    id: ESortBy.CREATED_AT,
    ...SORT_OPTIONS_MAP[ESortBy.CREATED_AT],
  },
  {
    id: ESortBy.REGISTRATION_END,
    ...SORT_OPTIONS_MAP[ESortBy.REGISTRATION_END],
  },
];

export enum EPetRequired {
  OPTIONAL = "OPTIONAL",
  NOT_REQUIRED = "NOT_REQUIRED",
}

export const PET_REQUIRED_OPTIONS_MAP: Record<
  EPetRequired,
  { value?: boolean; label: string }
> = {
  [EPetRequired.OPTIONAL]: {
    value: undefined,
    label: "함께 산책할 반려견이 있어요",
  },
  [EPetRequired.NOT_REQUIRED]: {
    value: false,
    label: "반려견 없이 참여하고 싶어요",
  },
};

export const PET_REQUIRED_OPTIONS = [
  {
    id: EPetRequired.OPTIONAL,
    ...PET_REQUIRED_OPTIONS_MAP[EPetRequired.OPTIONAL],
  },
  {
    id: EPetRequired.NOT_REQUIRED,
    ...PET_REQUIRED_OPTIONS_MAP[EPetRequired.NOT_REQUIRED],
  },
];

export enum ECreatePetRequired {
  REQUIRED = "C_REQUIRED",
  OPTIONAL = "C_OPTIONAL",
}

export const CREATE_PET_REQUIRED_OPTIONS_MAP: Record<
  ECreatePetRequired,
  { value?: boolean; label: string }
> = {
  [ECreatePetRequired.REQUIRED]: {
    value: true,
    label: "반려견이 함께 해야 해요",
  },
  [ECreatePetRequired.OPTIONAL]: {
    value: false,
    label: "반려견 없이도 참여 가능해요",
  },
};

export const CREATE_PET_REQUIRED_OPTIONS = [
  {
    id: ECreatePetRequired.REQUIRED,
    ...CREATE_PET_REQUIRED_OPTIONS_MAP[ECreatePetRequired.REQUIRED],
  },
  {
    id: ECreatePetRequired.OPTIONAL,
    ...CREATE_PET_REQUIRED_OPTIONS_MAP[ECreatePetRequired.OPTIONAL],
  },
];

export enum EIsClosed {
  SHOW_CLOSED = "SHOW_CLOSED",
  HIDE_CLOSED = "HIDE_CLOSED",
}

export const IS_CLOSED_OPTIONS_MAP: Record<
  EIsClosed,
  { value?: boolean; label: string }
> = {
  [EIsClosed.SHOW_CLOSED]: {
    value: undefined,
    label: "모임 마감된 모임도 표시",
  },
  [EIsClosed.HIDE_CLOSED]: {
    value: true,
    label: "모임 마감된 모임은 보지 않기",
  },
};

export const IS_CLOSED_OPTIONS = [
  {
    id: EIsClosed.SHOW_CLOSED,
    ...IS_CLOSED_OPTIONS_MAP[EIsClosed.SHOW_CLOSED],
  },
  {
    id: EIsClosed.HIDE_CLOSED,
    ...IS_CLOSED_OPTIONS_MAP[EIsClosed.HIDE_CLOSED],
  },
];
