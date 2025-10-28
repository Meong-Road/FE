import ProfileSvg from "@/assets/images/profile.svg";
import ImageWithFallback from "@/components/common/ImageWithFallback";
import { useGetMyInfo } from "@/hooks/queries/user/useGetMyInfo";

export function ProfileCardImage() {
  const { data: userData } = useGetMyInfo();

  return (
    <div className="bg-background relative size-14 overflow-hidden rounded-full border border-[#ddd] select-none">
      <ImageWithFallback
        src={userData?.image ?? null}
        alt="프로필 이미지"
        fill
        sizes="56px"
        renderFallback={() => <ProfileSvg className="size-full" />}
      />
    </div>
  );
}
