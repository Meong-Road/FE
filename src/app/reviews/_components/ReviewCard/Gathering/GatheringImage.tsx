"use client";

import { useState } from "react";
import Image from "next/image";

import { ReviewCardGatheringImageProps } from "../types";

export function GatheringImage({ image }: ReviewCardGatheringImageProps) {
  const [imageError, setImageError] = useState(false);

  // image가 없거나 로드 실패 시 기본 UI
  if (!image || imageError) {
    return <div className="h-[188px] w-[188px] rounded-3xl bg-gray-200" />;
  }

  return (
    <div className="h-[188px] w-[188px] rounded-3xl bg-gray-200">
      <Image
        src={image}
        alt="gathering image"
        width={188}
        height={188}
        className="h-full w-full overflow-hidden rounded-3xl object-cover"
        onError={() => setImageError(true)}
      />
    </div>
  );
}
