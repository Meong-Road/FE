import {
  SEOUL_DISTRICTS,
  SEOUL_DISTRICTS_WITH_ALL,
} from "../constants/location";

export type DistrictType = (typeof SEOUL_DISTRICTS)[number];
export type DistrictWithAllType = (typeof SEOUL_DISTRICTS_WITH_ALL)[number];

export interface LocationType {
  address_name: string;
  region_1depth_name: string;
  region_2depth_name: DistrictType;
  latlng: { lat: number; lng: number };
}
