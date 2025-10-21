import ProfileDefault from "@/assets/images/profile.svg";
import ImageWithFallback from "@/components/common/ImageWithFallback";
import { cn } from "@/lib/utils";

import { ReviewCardUserAvatarProps } from "../types";

export function UserAvatar({
  className,
  image,
  size = 40,
}: ReviewCardUserAvatarProps) {
  return (
    <div
      className={cn(
        "relative flex flex-shrink-0 items-center justify-center overflow-hidden rounded-full border-[1px] border-[#DDDDDD]",
        className,
      )}
      style={{ width: size, height: size }}
    >
      <ImageWithFallback
        src={image}
        alt="profile"
        fill
        sizes={`${size}px`}
        className="object-cover"
        renderFallback={() => <ProfileDefault />}
      />
    </div>
  );
}
