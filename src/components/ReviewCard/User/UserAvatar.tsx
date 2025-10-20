"use client";

import { useState } from "react";
import Image from "next/image";

import ProfileDefault from "@/assets/images/profile.svg";
import { cn } from "@/lib/utils";

import { ReviewCardUserAvatarProps } from "../types";

export function UserAvatar({
  className,
  image,
  size = 40,
}: ReviewCardUserAvatarProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className={cn(
        "flex flex-shrink-0 items-center justify-center overflow-hidden rounded-full border-[1px] border-[#DDDDDD]",
        className,
      )}
      style={{ width: size, height: size }}
    >
      {image && !imageError ? (
        <Image
          src={image}
          alt="profile"
          width={size}
          height={size}
          onError={() => setImageError(true)}
        />
      ) : (
        <ProfileDefault />
      )}
    </div>
  );
}
