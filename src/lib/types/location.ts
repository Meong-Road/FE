import {
  SEOUL_DISTRICTS,
  SEOUL_DISTRICTS_WITH_ALL,
} from "../constants/location";

import { KakaoReverseGeocodePlaceType } from "./kakao";

export type DistrictType = (typeof SEOUL_DISTRICTS)[number];
export type DistrictWithAllType = (typeof SEOUL_DISTRICTS_WITH_ALL)[number];

export interface LocationType extends KakaoReverseGeocodePlaceType {
  region_2depth_name: DistrictType;
}
