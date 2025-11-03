"use client";

import { useAuth } from "@/hooks/auth";

import { ProfileHeader } from "./_components/ProfileHeader";
import { ProfileInfo } from "./_components/ProfileInfo";
import { ProfileTabContent } from "./_components/ProfileTabContent";
import { ProfileTabs } from "./_components/ProfileTabs";
import { ProfilePageSkeleton } from "./_components/Skeleton";

export default function Profile() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <section>
        <ProfileHeader />
        <ProfilePageSkeleton />
      </section>
    );
  }

  if (!user) return <div>데이터가 없습니다.</div>;

  return (
    <section>
      <ProfileHeader />
      <ProfileInfo user={user} />
      <ProfileTabs />
      <section className="mt-6 sm:mt-8">
        <ProfileTabContent />
      </section>
    </section>
  );
}
