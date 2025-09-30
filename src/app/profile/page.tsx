import EditBtn from "./_components/EditBtn";
import { ProfileCard } from "./_components/ProfileCard";
import { Tab } from "./_components/Tab/Tab";

interface PageProps {
  searchParams?: Record<string, string | string[] | undefined>;
}

export default function Profile({ searchParams }: PageProps) {
  const currentTab =
    typeof searchParams?.tab === "string" ? searchParams.tab : "joined";

  return (
    <section className="mx-auto max-w-[1132px] pt-16">
      <h2 className="mb-4 text-center text-[32px] font-semibold">마이페이지</h2>
      <ProfileCard>
        <div className="mb-3 flex items-center justify-between">
          <ProfileCard.Header>내 프로필</ProfileCard.Header>
          <EditBtn />
        </div>
        <ProfileCard.Content>
          <ProfileCard.Image></ProfileCard.Image>
          <div className="pt-4">
            <ProfileCard.Name>럽원즈올</ProfileCard.Name>
            <dl>
              <ProfileCard.Info label="ID" value="Example2" />
              <ProfileCard.Info label="E-mail" value="Example@naver.com" />
            </dl>
          </div>
        </ProfileCard.Content>
      </ProfileCard>
      <Tab>
        <Tab.List>
          <Tab.Item href="/profile" isActive={currentTab === "joined"}>
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
