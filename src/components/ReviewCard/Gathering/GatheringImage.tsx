"use client";

import Dog from "@/assets/images/dog.svg";
import ImageWithFallback from "@/components/common/ImageWithFallback";

import { ReviewCardGatheringImageProps } from "../types";

export function GatheringImage({ image }: ReviewCardGatheringImageProps) {
  return (
    <div className="relative flex h-[188px] w-full flex-shrink-0 items-center justify-center overflow-hidden rounded-t-3xl bg-gray-200 sm:h-[188px] sm:w-[188px] sm:rounded-3xl">
      <ImageWithFallback
        src={image}
        alt="gathering image"
        fill
        sizes="(max-width: 640px) calc(100vw - 32px), 188px"
        className="object-cover"
        renderFallback={() => <Dog className="size-28" />}
      />
    </div>
  );
}
