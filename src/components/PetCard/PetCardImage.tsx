import DogImg from "@/assets/images/dog.svg";
import ImageWithFallback from "@/components/common/ImageWithFallback";
import { cn } from "@/lib/utils";

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
        className={cn(
          "bg-background relative flex size-[112px] items-center justify-center overflow-hidden rounded-full border-1",
          className,
        )}
      >
        <ImageWithFallback
          src={src}
          alt={alt}
          fill
          sizes={`${size}px`}
          renderFallback={() => <DogImg className="size-full" />}
        />
      </div>
    </div>
  );
}
