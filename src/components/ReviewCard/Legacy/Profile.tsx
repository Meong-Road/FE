"use client";

import { useState } from "react";
import Image from "next/image";

import ProfileDefault from "@/assets/images/profile.svg";
import { ReviewScore } from "@/lib/types/reviews";
import { formatDateShort } from "@/lib/utils/dateTime";

import { Rating } from "../Review/Rating";

interface ProfileProps {
  user?: {
    image: string | null;
    nickName: string;
  };
  score: ReviewScore;
  date?: string;
}

export function Profile({ user, score, date }: ProfileProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="flex items-center gap-3">
      {/* profile image */}
      <div className="flex h-[40px] w-[40px] flex-shrink-0 items-center justify-center overflow-hidden rounded-full border-[1px] border-[#DDDDDD]">
        {user?.image && !imageError ? (
          <Image
            src={user.image}
            alt="profile"
            width={40}
            height={40}
            onError={() => setImageError(true)}
          />
        ) : (
          <ProfileDefault />
        )}
      </div>

      {/* profile name, score, date */}
      <div className="flex-1 flex-col items-center gap-2 overflow-hidden">
        <span className="text-sm font-medium text-slate-800">
          {user?.nickName || "익명"}
        </span>
        <div className="flex items-center gap-2">
          <Rating score={score} />
          {date && (
            <span className="flex-shrink-0 text-xs text-slate-400 sm:text-sm">
              {formatDateShort(date)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
