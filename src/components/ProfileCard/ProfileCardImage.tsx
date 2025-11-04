import ProfileSvg from "@/assets/images/profile.svg";
import ImageWithFallback from "@/components/common/ImageWithFallback";
import { useGetMyInfo } from "@/hooks/queries/user/useGetMyInfo";
import { useGetUserById } from "@/hooks/queries/user/useGetUserById";

interface ProfileCardImageProps {
  userId?: number; // userId가 제공되면 해당 유저의 프로필, 없으면 내 프로필
}

export function ProfileCardImage({ userId }: ProfileCardImageProps) {
  // userId가 없을 때만 내 정보 가져오기
  const { data: myData } = useGetMyInfo({ enabled: !userId });
  // userId가 있을 때만 해당 유저 정보 가져오기
  const { data: userData } = useGetUserById(userId ?? 0);

  // userId가 있으면 해당 유저 정보, 없으면 내 정보 사용
  const profileData = userId ? userData : myData;

  return (
    <div className="bg-background relative size-14 overflow-hidden rounded-full border border-[#ddd] select-none">
      <ImageWithFallback
        src={profileData?.image ?? null}
        alt="프로필 이미지"
        fill
        sizes="56px"
        renderFallback={() => <ProfileSvg className="size-full" />}
      />
    </div>
  );
}
