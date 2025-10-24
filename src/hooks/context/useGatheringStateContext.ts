import { useContext } from "react";

import GatheringStateContext from "@/store/context/GatheringStateContext";

export function useGatheringStateContext() {
  const context = useContext(GatheringStateContext);

  if (!context) {
    throw new Error(
      "useGatheringStateContext는 useGatheringStateProvider 내에서 사용되어야 합니다.",
    );
  }

  return context;
}
