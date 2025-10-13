import { RegularGatheringType } from "./gatherings";
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
