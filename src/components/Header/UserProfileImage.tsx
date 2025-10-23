import ProfileSvg from "@/assets/images/profile.svg";
import ImageWithFallback from "@/components/common/ImageWithFallback";
import { UserType } from "@/lib/types/user";

const UserProfileImage = ({
  userProfileImageURL,
}: {
  userProfileImageURL: UserType["image"];
}) => {
  return (
    <div className="relative size-[45px] overflow-hidden rounded-full border border-[#DDDDDD]">
      <ImageWithFallback
        src={userProfileImageURL}
        alt="profile"
        width={45}
        height={45}
        sizes="45px"
        className="rounded-full focus:outline-none"
        renderFallback={() => <ProfileSvg width={45} height={45} />}
      />
    </div>
  );
};

export default UserProfileImage;
