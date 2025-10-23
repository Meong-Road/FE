"use client";

import { UserInfoModal } from "@/components/Modal";
import { Tab } from "@/components/Tab";
import { useAuth } from "@/hooks/auth";
import { useSearchParamsState } from "@/hooks/useSearchParamsState";
import { PROFILE_TABS } from "@/lib/constants/profile";
import { UserType } from "@/lib/types/user";
import { useUserInfoModalStore } from "@/store/modalStore";

import CreatedSection from "./_components/CreatedSection";
import JoinedSection from "./_components/JoinedSection";
import PetCardSection from "./_components/PetCardSection";
import { ProfileCard } from "./_components/ProfileCard";
import ReviewSection from "./_components/ReviewSection";

const ProfileHeader = () => (
  <h2 className="mb-4 text-left text-[32px] leading-none font-semibold">
    마이페이지
  </h2>
);

const ProfileInfo = ({ user }: { user: UserType }) => (
  <ProfileCard>
    <div className="mb-4 flex items-center justify-between">
      <ProfileCard.Header>내 프로필</ProfileCard.Header>
      <ProfileCard.EditBtn userId={user.id} />
    </div>
    <ProfileCard.Content>
      <ProfileCard.Image />
      <div className="flex flex-1 flex-col justify-between">
        <ProfileCard.NickName nickName={user.nickName || user.name} />
        <ProfileCard.Info name={user.name} email={user.email} />
      </div>
    </ProfileCard.Content>
  </ProfileCard>
);

const TabNavigation = () => {
  const { tab } = useSearchParamsState({ tab: PROFILE_TABS.JOINED.key });

  return (
    <Tab className="mt-16">
      <Tab.List>
        {Object.values(PROFILE_TABS).map((tabItem) => (
          <Tab.Item
            key={tabItem.key}
            href={tabItem.href}
            isActive={tab === tabItem.key}
          >
            {tabItem.label}
          </Tab.Item>
        ))}
      </Tab.List>
    </Tab>
  );
};

const TabContent = () => {
  const { tab } = useSearchParamsState({ tab: PROFILE_TABS.JOINED.key });

  switch (tab) {
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
  const { user, isLoading } = useAuth();
  const { isOpen, modalType, userId, closeModal } = useUserInfoModalStore();

  if (isLoading) return <div>Loading...</div>;
  if (!user) return <div>데이터가 없습니다.</div>;

  return (
    <section>
      <ProfileHeader />
      <ProfileInfo user={user} />
      <TabNavigation />
      <section className="mt-6">
        <TabContent />
      </section>

      {isOpen && modalType && (
        <UserInfoModal
          type={modalType}
          onClose={closeModal}
          userId={userId || user.id}
        />
      )}
    </section>
  );
}
