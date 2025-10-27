import DogImg from "@/assets/images/dog.svg";
import ImageWithFallback from "@/components/common/ImageWithFallback";

interface PetCardImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function PetCardImage({ src, alt, className }: PetCardImageProps) {
  return (
    <div className="mb-4 flex justify-center">
      <div
        className={`bg-background relative flex size-[112px] items-center justify-center overflow-hidden rounded-full border-1 ${className || ""}`}
      >
        <ImageWithFallback
          src={src}
          alt={alt}
          fill
          sizes="112px"
          renderFallback={() => <DogImg className="size-full" />}
        />
      </div>
    </div>
  );
}
