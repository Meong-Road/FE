import Image from "next/image";

import ProfileSvg from "@/assets/images/profile2.svg";

import { ProfileCardImageProps } from "./types";

export function ProfileCardImage({ src }: ProfileCardImageProps) {
  return (
    <div className="h-14 w-14 rounded-full">
      {src ? (
        <Image
          src={src}
          alt="프로필 이미지"
          width={56}
          height={56}
          className="h-full w-full rounded-full object-cover"
        />
      ) : (
        <ProfileSvg width={56} height={56} />
      )}
    </div>
  );
}
