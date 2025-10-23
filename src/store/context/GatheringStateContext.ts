"use client";

import { createContext } from "react";

import { EGatheringState, GatheringType } from "@/lib/types/gatherings";
import { UserType } from "@/lib/types/user";

export interface GatheringStateContextType {
  gathering: GatheringType;
  user?: UserType | null;
  state: EGatheringState;
}

const GatheringStateContext = createContext<GatheringStateContextType | null>(
  null,
);

export default GatheringStateContext;
