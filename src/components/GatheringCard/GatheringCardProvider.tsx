import { ReactNode } from "react";

import GatheringStateContext, {
  GatheringStateContextType,
} from "@/store/context/GatheringStateContext";

interface GatheringCardProviderProps {
  children: ReactNode;
  value: GatheringStateContextType;
}

export function GatheringCardProvider({
  children,
  value,
}: GatheringCardProviderProps) {
  return (
    <GatheringStateContext.Provider value={value}>
      {children}
    </GatheringStateContext.Provider>
  );
}
