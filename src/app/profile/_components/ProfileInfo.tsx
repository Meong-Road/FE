import { ProfileCard } from "@/components/ProfileCard";
import { UserType } from "@/lib/types/user";

interface ProfileInfoProps {
  user: UserType;
}

export function ProfileInfo({ user }: ProfileInfoProps) {
  return (
    <ProfileCard>
      <ProfileCard.Header>내 프로필</ProfileCard.Header>
      <ProfileCard.EditBtn userId={user.id} />
      <ProfileCard.Content>
        <ProfileCard.Image />
        <div className="flex flex-1 flex-col justify-between">
          <ProfileCard.NickName nickName={user.nickName || user.name} />
          <ProfileCard.Info name={user.name} email={user.email} />
        </div>
      </ProfileCard.Content>
    </ProfileCard>
  );
}
