"use client";

import Dog from "@/assets/images/dog.svg";
import ImageWithFallback from "@/components/common/ImageWithFallback";

import { ReviewCardGatheringImageProps } from "../types";

export function GatheringImage({ image }: ReviewCardGatheringImageProps) {
  return (
    <div className="relative flex size-[188px] items-center justify-center overflow-hidden rounded-3xl bg-gray-200">
      <ImageWithFallback
        src={image}
        alt="gathering image"
        fill
        sizes="188px"
        className="object-cover"
        renderFallback={() => <Dog className="size-28" />}
      />
    </div>
  );
}
