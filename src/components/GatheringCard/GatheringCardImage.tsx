import Dog from "@/assets/images/dog.svg";

import ImageWithFallback from "../common/ImageWithFallback";

interface GatheringCardImageProps {
  src: string | null;
  alt: string;
  isInvalid?: boolean;
}

export function GatheringCardImage({
  src,
  alt,
  isInvalid = false,
}: GatheringCardImageProps) {
  return (
    <div className="relative flex size-[188px] items-center justify-center overflow-hidden rounded-3xl">
      {isInvalid && (
        <div className="absolute inset-0 z-[5] flex items-center justify-center bg-black/60">
          <span className="text-base font-bold text-white">
            모집이 마감되었어요
          </span>
        </div>
      )}
      <ImageWithFallback
        src={src}
        alt={alt}
        fill
        sizes="188px"
        className="object-cover"
        renderFallback={() => <Dog className="size-28" />}
      />
    </div>
  );
}
