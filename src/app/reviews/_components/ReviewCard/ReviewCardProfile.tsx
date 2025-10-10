"use client";

import { useState } from "react";
import Image from "next/image";

import Heart from "@/assets/icons/heart.svg";
import HeartEmpty from "@/assets/icons/heart-empty.svg";
import ProfileDefault from "@/assets/images/profile3.svg";
import { formatDateShort } from "@/lib/utils/dateTime";

import { ReviewCardProfileProps } from "./types";

const MAX_SCORE = 5;

export function ReviewCardProfile({
  profileImage,
  nickName,
  score,
  createdAt,
}: ReviewCardProfileProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="flex items-center gap-3">
      {/* profile image */}
      <div className="flex h-[40px] w-[40px] flex-shrink-0 items-center justify-center overflow-hidden rounded-full border-[1px] border-[#DDDDDD]">
        {profileImage && !imageError ? (
          <Image
            src={profileImage}
            alt="profile"
            width={40}
            height={40}
            onError={() => setImageError(true)}
          />
        ) : (
          <ProfileDefault />
        )}
      </div>

      {/* profile name, score, createdAt */}
      <div className="flex-1 flex-col items-center gap-2 overflow-hidden">
        <span className="text-sm font-medium text-slate-800">{nickName}</span>
        <div className="flex items-center gap-2">
          <ol className="flex flex-shrink-0">
            {Array.from({ length: score }, (_, index) => (
              <li
                className="flex flex-shrink-0 items-center justify-center"
                key={index}
              >
                <Heart />
              </li>
            ))}
            {Array.from({ length: MAX_SCORE - score }, (_, index) => (
              <li
                className="flex flex-shrink-0 items-center justify-center"
                key={index}
              >
                <HeartEmpty />
              </li>
            ))}
          </ol>
          <span className="flex-shrink-0 text-sm text-slate-400">
            {formatDateShort(createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
}
