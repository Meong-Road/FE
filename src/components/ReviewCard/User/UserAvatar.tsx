import ProfileDefault from "@/assets/images/profile.svg";
import ImageWithFallback from "@/components/common/ImageWithFallback";
import { cn } from "@/lib/utils";

import { ReviewCardUserAvatarProps } from "../types";

export function UserAvatar({ className, image }: ReviewCardUserAvatarProps) {
  return (
    <div
      className={cn(
        "relative flex size-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-full border-[1px] border-[#DDDDDD] sm:size-12",
        className,
      )}
    >
      <ImageWithFallback
        src={image}
        alt="profile"
        fill
        sizes="100px"
        renderFallback={() => <ProfileDefault className="size-full" />}
      />
    </div>
  );
}
