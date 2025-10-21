import Image from "next/image";

import ProfileSvg from "@/assets/images/profile.svg";
import { UserType } from "@/lib/types/user";

const UserProfileImage = ({
  userProfileImageURL,
}: {
  userProfileImageURL: UserType["image"];
}) => {
  return (
    <>
      {userProfileImageURL ? (
        <Image
          src={userProfileImageURL}
          alt="profile"
          width={42}
          height={42}
          className="cursor-pointer rounded-full border border-[#DDDDDD]"
        />
      ) : (
        <ProfileSvg
          width={42}
          height={42}
          className="cursor-pointer rounded-full border border-[#DDDDDD]"
        />
      )}
    </>
  );
};

export default UserProfileImage;
