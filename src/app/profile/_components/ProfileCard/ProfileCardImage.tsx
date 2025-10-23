import ProfileSvg from "@/assets/images/profile.svg";
import ImageWithFallback from "@/components/common/ImageWithFallback";
import { useGetMyInfo } from "@/hooks/queries/user/useGetMyInfo";

export function ProfileCardImage() {
  const { data: userData } = useGetMyInfo();

  return (
    <div className="bg-background size-14 overflow-hidden rounded-full border border-[#ddd]">
      <ImageWithFallback
        src={userData?.image ?? null}
        alt="프로필 이미지"
        width={56}
        height={56}
        renderFallback={() => <ProfileSvg width={56} height={56} />}
      />
    </div>
  );
}
