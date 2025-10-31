"use client";

import { TabContent } from "@/components/motionWrappers";
import { useSearchParamsState } from "@/hooks/useSearchParamsState";
import { CREATED_SUB_TABS } from "@/lib/constants/profile";

import CreatedSubTabs from "../SubTabs/CreatedSubTabs";

import CreatedStatusSection from "./CreatedStatusSection";

export default function CreatedSection() {
  const { createdTab } = useSearchParamsState({
    createdTab: CREATED_SUB_TABS.RECRUITING.value,
  });

  const getStatusForTab = (tab: string) => {
    switch (tab) {
      case CREATED_SUB_TABS.RECRUITING.value:
        return "RECRUITING" as const;
      case CREATED_SUB_TABS.CONFIRMED.value:
        return "CONFIRMED" as const;
      case CREATED_SUB_TABS.CANCELED.value:
        return "CANCELED" as const;
      case CREATED_SUB_TABS.COMPLETED.value:
        return "COMPLETED" as const;
      default:
        return "RECRUITING" as const;
    }
  };

  return (
    <div>
      <CreatedSubTabs />
      <TabContent tabKey={createdTab} className="mt-6">
        <CreatedStatusSection status={getStatusForTab(createdTab)} />
      </TabContent>
    </div>
  );
}
