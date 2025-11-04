"use client";

import { useParams } from "next/navigation";

import { ErrorState } from "@/components/common";
import { ProfileCard } from "@/components/ProfileCard";
import { useGetUserById } from "@/hooks/queries/user";

import { ProfileHeader } from "../_components/ProfileHeader";
import { ProfilePageSkeleton } from "../_components/Skeleton";

import { UserProfileTabContent } from "./_components/UserProfileTabContent";
import { UserProfileTabs } from "./_components/UserProfileTabs";

export default function UserProfilePage() {
  const params = useParams();
  const userId = Number(params.id);

  const { data: user, isPending, isError } = useGetUserById(userId);

  if (isPending) {
    return (
      <section>
        <ProfileHeader title="유저페이지" />
        <ProfilePageSkeleton />
      </section>
    );
  }

  if (isError || !user) {
    return (
      <section>
        <ProfileHeader title="유저페이지" />
        <ErrorState message="사용자 정보를 불러오는데 실패했습니다." />
      </section>
    );
  }

  return (
    <section>
      <ProfileHeader title="유저페이지" />
      <ProfileCard>
        <ProfileCard.Header>
          {user.nickName || user.name}님의 프로필
        </ProfileCard.Header>
        <ProfileCard.EditBtn userId={user.id} />
        <ProfileCard.Content>
          <ProfileCard.Image />
          <div className="flex flex-1 flex-col justify-between">
            <ProfileCard.NickName nickName={user.nickName || user.name} />
            <ProfileCard.Info name={user.name} email={user.email} />
          </div>
        </ProfileCard.Content>
      </ProfileCard>

      <UserProfileTabs />

      <section className="mt-6 sm:mt-8">
        <UserProfileTabContent userId={userId} />
      </section>
    </section>
  );
}
