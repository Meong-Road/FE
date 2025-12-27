"use client";

import { useSearchParamsState } from "@/hooks/useSearchParamsState";
import { USER_PROFILE_TABS } from "@/lib/constants/profile";

import UserPetCardSection from "./UserPetCardSection";
import UserReviewSection from "./UserReviewSection";

interface UserProfileTabContentProps {
  userId: number;
}

export function UserProfileTabContent({ userId }: UserProfileTabContentProps) {
  const {
    params: { tab },
  } = useSearchParamsState({ tab: USER_PROFILE_TABS.PETS.value });

  switch (tab) {
    case USER_PROFILE_TABS.PETS.value:
      return <UserPetCardSection userId={userId} />;
    case USER_PROFILE_TABS.REVIEWS.value:
      return <UserReviewSection userId={userId} />;
    default:
      return <UserPetCardSection userId={userId} />;
  }
}
