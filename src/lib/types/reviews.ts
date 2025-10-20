import { SEOUL_ALL, SEOUL_DISTRICTS } from "../constants/location";

import { RegularGatheringType } from "./gatherings";
import { UserType } from "./user";

export type ReviewScore = 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5;
export type LocationType = (typeof SEOUL_ALL)[number]; // location 타입 종류
export type LocationParamType = (typeof SEOUL_DISTRICTS)[number] | null; // API 호출 시 서울 전체의 location 파라미터는 null

export interface ReviewType {
  id: number;
  userId: UserType["id"];
  gatheringId: RegularGatheringType["id"];
  score: ReviewScore;
  comment: string;
  createdAt: string;
  gathering: RegularGatheringType;
  user: UserType;
}

export interface ReviewDashboardType {
  averageScore: number;
  oneStar: number;
  twoStars: number;
  threeStars: number;
  fourStars: number;
  fiveStars: number;
}
