"use client";

import Link from "next/link";

import Dog from "@/assets/images/dog.svg";
import ImageWithFallback from "@/components/common/ImageWithFallback";
import { PATH } from "@/lib/constants/path";
import { EGatheringType } from "@/lib/types/gatherings";

import { ReviewCardGatheringImageProps } from "../types";

export function GatheringImage({
  image,
  gatheringId,
}: ReviewCardGatheringImageProps) {
  return (
    <Link
      href={PATH.DETAIL(gatheringId, EGatheringType.REGULAR)}
      className="sm:size-fit"
    >
      <div className="group/image relative flex aspect-video w-full flex-shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-t-3xl bg-gray-200 transition-opacity sm:h-[188px] sm:w-[188px] sm:rounded-3xl">
        <ImageWithFallback
          src={image}
          alt="gathering image"
          fill
          sizes="(max-width: 640px) calc(100vw - 32px), 188px"
          className="object-cover transition-all duration-300 ease-in-out group-hover/image:scale-105"
          renderFallback={() => (
            <Dog className="size-28 transition-all duration-300 ease-in-out group-hover/image:scale-105" />
          )}
        />
      </div>
    </Link>
  );
}
