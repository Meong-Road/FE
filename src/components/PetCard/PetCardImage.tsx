import DogImg from "@/assets/images/dog.svg";
import ImageWithFallback from "@/components/common/ImageWithFallback";

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
        <ImageWithFallback
          src={src}
          alt={alt}
          width={size}
          height={size}
          className="size-full object-cover"
          renderFallback={() => <DogImg className="size-full" />}
        />
      </div>
    </div>
  );
}
