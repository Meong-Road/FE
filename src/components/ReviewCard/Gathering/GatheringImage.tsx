"use client";

import { useState } from "react";
import Image from "next/image";

import { ReviewCardGatheringImageProps } from "../types";

export function GatheringImage({ image }: ReviewCardGatheringImageProps) {
  const [imageError, setImageError] = useState(false);
  return (
    <div className="relative flex size-[188px] items-center justify-center overflow-hidden rounded-3xl bg-gray-200">
      {image && !imageError && (
        <Image
          src={image}
          alt="gathering image"
          fill
          className="object-cover"
          onError={() => setImageError(true)}
        />
      )}
    </div>
  );
}
