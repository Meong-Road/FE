"use client";

import Image from "next/image";

import Dog from "@/assets/images/dog.svg";

interface PetCardImageProps {
  image?: string | null;
}

export function PetCardImage({ image }: PetCardImageProps) {
  return (
    <div className="flex h-[216px] max-w-[234px] items-center justify-center overflow-hidden rounded-3xl bg-white">
      {image ? (
        <Image
          src={image}
          alt="반려견 사진"
          width={234}
          height={216}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-[114px] w-[114px] items-center justify-center rounded-full border-[1px] border-slate-100">
          <Dog className="size-20" />
        </div>
      )}
    </div>
  );
}
