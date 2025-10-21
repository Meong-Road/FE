import Image from "next/image";

import DogImg from "@/assets/images/dog.svg";

interface PetCardImageProps {
  src: string;
  alt: string;
  className?: string;
  size?: number;
}

export function PetCardImage({
  src,
  alt,
  className,
  size = 112,
}: PetCardImageProps) {
  return (
    <div className="mb-4 flex justify-center">
      <div
        className={`bg-background relative flex items-center justify-center overflow-hidden rounded-full border-1 ${className || ""}`}
        style={{ height: size, width: size }}
      >
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            sizes={`${size}px`}
          />
        ) : (
          <DogImg className="object-cover" />
        )}
      </div>
    </div>
  );
}
