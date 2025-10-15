"use client";

import { useState } from "react";
import Image from "next/image";

import { ReviewCardGatheringImageProps } from "../types";

export function GatheringImage({ image }: ReviewCardGatheringImageProps) {
  const [imageError, setImageError] = useState(false);
  return (
    <div className="relative h-45 w-45 rounded-3xl bg-gray-200 select-none">
      {image && !imageError && (
        <Image
          src={image}
          alt="gathering image"
          fill
          className="h-full w-full overflow-hidden rounded-3xl object-cover"
          onError={() => setImageError(true)}
        />
      )}
    </div>
  );
}
