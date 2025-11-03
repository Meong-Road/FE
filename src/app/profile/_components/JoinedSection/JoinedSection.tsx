"use client";

import { TabContent } from "@/components/motionWrappers";
import { useSearchParamsState } from "@/hooks/useSearchParamsState";
import { JOINED_SUB_TABS } from "@/lib/constants/profile";

import JoinedSubTabs from "../SubTabs/JoinedSubTabs";

import JoinedStatusSection from "./JoinedStatusSection";

export default function JoinedSection() {
  const { joinedTab } = useSearchParamsState({
    joinedTab: JOINED_SUB_TABS.RECRUITING.value,
  });

  const getStatusForTab = (tab: string) => {
    switch (tab) {
      case JOINED_SUB_TABS.RECRUITING.value:
        return "RECRUITING" as const;
      case JOINED_SUB_TABS.CONFIRMED.value:
        return "CONFIRMED" as const;
      case JOINED_SUB_TABS.CANCELED.value:
        return "CANCELED" as const;
      case JOINED_SUB_TABS.COMPLETED.value:
        return "COMPLETED" as const;
      default:
        return "RECRUITING" as const;
    }
  };

  return (
    <div>
      <JoinedSubTabs />
      <TabContent tabKey={joinedTab as string} className="mt-6">
        <JoinedStatusSection status={getStatusForTab(joinedTab as string)} />
      </TabContent>
    </div>
  );
}
