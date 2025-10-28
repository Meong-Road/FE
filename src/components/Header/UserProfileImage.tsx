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
        fill
        sizes="45px"
        renderFallback={() => <ProfileSvg className="size-full" />}
      />
    </div>
  );
};

export default UserProfileImage;
