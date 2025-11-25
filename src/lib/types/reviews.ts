import { RegularGatheringType } from "./gatherings";
import { DistrictType, DistrictWithAllType } from "./location";
import { UserType } from "./user";

// 리뷰 입력 시 사용되는 정수 점수 (1-5)
export type ReviewInputScore = 1 | 2 | 3 | 4 | 5;

// 리뷰 표시 시 사용되는 점수 (평균 점수 포함, 0.5 단위)
export type ReviewDisplayScore =
  | 0.5
  | 1
  | 1.5
  | 2
  | 2.5
  | 3
  | 3.5
  | 4
  | 4.5
  | 5;

// 하위 호환성을 위한 별칭 (기존 ReviewType에서 사용)
export type ReviewScore = ReviewInputScore;
export type District = DistrictWithAllType;
export type DistrictParam = DistrictType | null;

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
