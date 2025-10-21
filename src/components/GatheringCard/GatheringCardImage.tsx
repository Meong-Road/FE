import Dog from "@/assets/images/dog.svg";

import ImageWithFallback from "../common/ImageWithFallback";

interface GatheringCardImageProps {
  src: string | null;
  alt: string;
}

export function GatheringCardImage({ src, alt }: GatheringCardImageProps) {
  return (
    <div className="relative flex size-[188px] items-center justify-center overflow-hidden rounded-3xl">
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
