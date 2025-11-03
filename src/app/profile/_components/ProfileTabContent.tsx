"use client";

import { TabContent } from "@/components/motionWrappers";
import { useSearchParamsState } from "@/hooks/useSearchParamsState";
import { PROFILE_TABS } from "@/lib/constants/profile";

import CreatedSection from "./CreatedSection/CreatedSection";
import JoinedSection from "./JoinedSection/JoinedSection";
import PetCardSection from "./PetCardSection/PetCardSection";
import ReviewSection from "./ReviewSection/ReviewSection";

export function ProfileTabContent() {
  const { tab } = useSearchParamsState({ tab: PROFILE_TABS.JOINED.value });

  const renderContent = () => {
    switch (tab) {
      case PROFILE_TABS.JOINED.value:
        return <JoinedSection />;
      case PROFILE_TABS.CREATED.value:
        return <CreatedSection />;
      case PROFILE_TABS.REVIEWS.value:
        return <ReviewSection />;
      case PROFILE_TABS.PETS.value:
        return <PetCardSection />;
      default:
        return <JoinedSection />;
    }
  };

  return <TabContent tabKey={tab as string}>{renderContent()}</TabContent>;
}
