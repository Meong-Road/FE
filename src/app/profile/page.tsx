import { ProfileCard } from "./_components/ProfileCard";

export default function Profile() {
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
    </section>
  );
}
