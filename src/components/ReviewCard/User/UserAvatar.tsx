"use client";

import { useState } from "react";
import Image from "next/image";

import ProfileDefault from "@/assets/images/profile3.svg";

import { ReviewCardUserAvatarProps } from "../types";

export function UserAvatar({ image, size = 40 }: ReviewCardUserAvatarProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className="flex flex-shrink-0 items-center justify-center overflow-hidden rounded-full border-[1px] border-[#DDDDDD]"
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
