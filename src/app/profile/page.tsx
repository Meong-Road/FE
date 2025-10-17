"use client";

import { useSearchParams } from "next/navigation";

import { useGetMyInfo } from "@/hooks/queries/user";
import { PATH } from "@/lib/constants/path";

import CreatedSection from "./_components/CreatedSection";
import EditBtn from "./_components/EditBtn";
import JoinedSection from "./_components/JoinedSection";
import PetCardSection from "./_components/PetCardSection";
import { ProfileCard } from "./_components/ProfileCard";
import ReviewSection from "./_components/ReviewSection";
import { Tab } from "./_components/Tab";

export default function Profile() {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "joined";

  const { data: myInfo, isLoading } = useGetMyInfo();

  if (isLoading) {
    return (
      <section>
        <h2 className="mb-4 text-center text-[32px] font-semibold">
          마이페이지
        </h2>
        <div className="flex min-h-[400px] items-center justify-center">
          <p className="text-slate-400">로딩 중...</p>
        </div>
      </section>
    );
  }

  if (!myInfo) {
    return (
      <section>
        <h2 className="mb-4 text-center text-[32px] font-semibold">
          마이페이지
        </h2>
        <div className="flex min-h-[400px] items-center justify-center">
          <p className="text-slate-400">사용자 정보를 불러올 수 없습니다.</p>
        </div>
      </section>
    );
  }

  return (
    <section>
      <h2 className="mb-4 text-center text-[32px] font-semibold">마이페이지</h2>
      <ProfileCard>
        <div className="mb-3 flex items-center justify-between">
          <ProfileCard.Header>내 프로필</ProfileCard.Header>
          <EditBtn />
        </div>
        <ProfileCard.Content>
          <ProfileCard.Image />
          <div className="pt-4">
            <ProfileCard.Name>
              {myInfo.nickName || myInfo.name}
            </ProfileCard.Name>
            <dl>
              <ProfileCard.Info label="ID" value={myInfo.name} />
              <ProfileCard.Info label="E-mail" value={myInfo.email} />
            </dl>
          </div>
        </ProfileCard.Content>
      </ProfileCard>
      <Tab className="mt-16">
        <Tab.List>
          <Tab.Item href={PATH.MY_PROFILE} isActive={currentTab === "joined"}>
            내 모임
          </Tab.Item>
          <Tab.Item
            href={`${PATH.MY_PROFILE}?tab=reviews`}
            isActive={currentTab === "reviews"}
          >
            내 리뷰
          </Tab.Item>
          <Tab.Item
            href={`${PATH.MY_PROFILE}?tab=created`}
            isActive={currentTab === "created"}
          >
            내가 만든 모임
          </Tab.Item>
          <Tab.Item
            href={`${PATH.MY_PROFILE}?tab=pets`}
            isActive={currentTab === "pets"}
          >
            반려견 정보
          </Tab.Item>
        </Tab.List>
      </Tab>
      <section className="mt-6">
        {currentTab === "joined" && <JoinedSection />}
        {currentTab === "created" && <CreatedSection />}
        {currentTab === "reviews" && <ReviewSection />}
        {currentTab === "pets" && <PetCardSection />}
      </section>
    </section>
  );
}
