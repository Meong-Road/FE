import { PATH } from "@/lib/constants/path";
import { mockUserProfile } from "@/mocks/data/profile";

import CreatedSection from "./_components/CreatedSection";
import EditBtn from "./_components/EditBtn";
import JoinedSection from "./_components/JoinedSection";
import PetCardSection from "./_components/PetCardSection";
import { ProfileCard } from "./_components/ProfileCard";
import ReviewSection from "./_components/ReviewSection";
import { Tab } from "./_components/Tab";

interface ProfileProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

export default async function Profile({ searchParams }: ProfileProps) {
  const resolvedSearchParams = await searchParams;
  const currentTab =
    typeof resolvedSearchParams?.tab === "string"
      ? resolvedSearchParams.tab
      : "joined";

  // Mock 데이터 사용
  const userProfile = mockUserProfile;

  return (
    <section className="mx-auto max-w-[1132px]">
      <h2 className="mb-4 text-center text-[32px] font-semibold">마이페이지</h2>
      <ProfileCard>
        <div className="mb-3 flex items-center justify-between">
          <ProfileCard.Header>내 프로필</ProfileCard.Header>
          <EditBtn />
        </div>
        <ProfileCard.Content>
          <ProfileCard.Image src={userProfile.image}></ProfileCard.Image>
          <div className="pt-4">
            <ProfileCard.Name>{userProfile.name}</ProfileCard.Name>
            <dl>
              <ProfileCard.Info label="ID" value={userProfile.nickName} />
              <ProfileCard.Info label="E-mail" value={userProfile.email} />
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
