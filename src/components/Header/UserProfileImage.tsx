import ProfileSvg from "@/assets/images/profile.svg";
import ImageWithFallback from "@/components/common/ImageWithFallback";
import { UserType } from "@/lib/types/user";

const UserProfileImage = ({
  userProfileImageURL,
}: {
  userProfileImageURL: UserType["image"];
}) => {
  return (
    <div className="relative size-[42px] overflow-hidden rounded-full border border-[#DDDDDD]">
      <ImageWithFallback
        src={userProfileImageURL}
        alt="profile"
        fill
        sizes="42px"
        className="cursor-pointer rounded-full border border-[#DDDDDD] focus:outline-none"
        renderFallback={() => <ProfileSvg width={42} height={42} />}
      />
    </div>
  );
};

export default UserProfileImage;
