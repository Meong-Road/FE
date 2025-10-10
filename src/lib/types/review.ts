import { RegularGatheringType } from "./gathering";
import { UserType } from "./user";

export type ReviewScore = 1 | 2 | 3 | 4 | 5;

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

export interface GetReviewsReq {
  location?: string | null;
  page?: number;
  size?: number;
  sort?: string;
}

export interface GetReviewsRes {
  content: ReviewType[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
  first?: boolean;
  empty?: boolean;
}
