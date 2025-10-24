"use client";
import { useState } from "react";
import NextImage, { ImageProps } from "next/image";

interface ImageWithFallbackProps extends Omit<ImageProps, "src"> {
  src: string | null;
  renderFallback: () => React.ReactNode;
}

export default function ImageWithFallback({
  src,
  renderFallback,
  ...props
}: ImageWithFallbackProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <>
      {src && !imageError ? (
        <NextImage
          src={src}
          width={props.width}
          height={props.height}
          onError={() => setImageError(true)}
          className="object-cover"
          {...props}
        />
      ) : (
        renderFallback()
      )}
    </>
  );
}
