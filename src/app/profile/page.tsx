"use client";

import { useSearchParams } from "next/navigation";

import { useAuth } from "@/hooks/auth";
import { PROFILE_TABS } from "@/lib/constants/profile";
import { UserType } from "@/lib/types/user";

import CreatedSection from "./_components/CreatedSection";
import EditBtn from "./_components/EditBtn";
import JoinedSection from "./_components/JoinedSection";
import PetCardSection from "./_components/PetCardSection";
import { ProfileCard } from "./_components/ProfileCard";
import ReviewSection from "./_components/ReviewSection";
import { Tab } from "./_components/Tab";

const ProfileHeader = () => (
  <h2 className="mb-4 text-center text-[32px] font-semibold">마이페이지</h2>
);

const ProfileInfo = ({ user }: { user: UserType }) => (
  <ProfileCard>
    <div className="mb-3 flex items-center justify-between">
      <ProfileCard.Header>내 프로필</ProfileCard.Header>
      <EditBtn />
    </div>
    <ProfileCard.Content>
      <ProfileCard.Image />
      <div className="pt-4">
        <ProfileCard.Name>{user.nickName || user.name}</ProfileCard.Name>
        <dl>
          <ProfileCard.Info label="ID" value={user.name} />
          <ProfileCard.Info label="E-mail" value={user.email} />
        </dl>
      </div>
    </ProfileCard.Content>
  </ProfileCard>
);

const TabNavigation = ({ currentTab }: { currentTab: string }) => (
  <Tab className="mt-16">
    <Tab.List>
      {Object.values(PROFILE_TABS).map((tab) => (
        <Tab.Item
          key={tab.key}
          href={tab.href}
          isActive={currentTab === tab.key}
        >
          {tab.label}
        </Tab.Item>
      ))}
    </Tab.List>
  </Tab>
);

const TabContent = ({ currentTab }: { currentTab: string }) => {
  switch (currentTab) {
    case PROFILE_TABS.JOINED.key:
      return <JoinedSection />;
    case PROFILE_TABS.CREATED.key:
      return <CreatedSection />;
    case PROFILE_TABS.REVIEWS.key:
      return <ReviewSection />;
    case PROFILE_TABS.PETS.key:
      return <PetCardSection />;
    default:
      return <JoinedSection />;
  }
};

export default function Profile() {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || PROFILE_TABS.JOINED.key;
  const { user, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;
  if (!user) return <div>데이터가 없습니다.</div>;

  return (
    <section>
      <ProfileHeader />
      <ProfileInfo user={user} />
      <TabNavigation currentTab={currentTab} />
      <section className="mt-6">
        <TabContent currentTab={currentTab} />
      </section>
    </section>
  );
}
