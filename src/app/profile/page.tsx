"use client";
import { useSearchParams } from "next/navigation";

import { ProfileCard } from "./_components/ProfileCard";
import { Tab } from "./_components/Tab/Tab";

export default function Profile() {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "profile";

  return (
    <section>
      <h2>마이페이지</h2>
      <ProfileCard>
        <ProfileCard.Header>내 프로필</ProfileCard.Header>
        <ProfileCard.Content>
          <ProfileCard.Image></ProfileCard.Image>
          <ProfileCard.Name>럽원즈올</ProfileCard.Name>
          <dl>
            <ProfileCard.Info label="ID" value="Example2" />
            <ProfileCard.Info label="E-mail" value="Example@naver.com" />
          </dl>
        </ProfileCard.Content>
      </ProfileCard>
      <Tab>
        <Tab.List>
          <Tab.Item
            href="/profile?tab=joined"
            isActive={currentTab === "joined"}
          >
            내 모임
          </Tab.Item>
          <Tab.Item
            href="/profile?tab=reviews"
            isActive={currentTab === "reviews"}
          >
            내 리뷰
          </Tab.Item>
          <Tab.Item
            href="/profile?tab=created"
            isActive={currentTab === "created"}
          >
            내가 만든 모임
          </Tab.Item>
          <Tab.Item href="/profile?tab=pets" isActive={currentTab === "pets"}>
            반려견 정보
          </Tab.Item>
        </Tab.List>
      </Tab>
    </section>
  );
}
