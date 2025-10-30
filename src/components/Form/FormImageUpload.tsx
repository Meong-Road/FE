"use client";

import React, { useEffect, useState } from "react";

import ImageWithFallback from "../common/ImageWithFallback";

import { EditButton, RemoveButton } from "./_components";

interface FormImageUploadProps {
  id?: string;
  placeholder?: string;
  children: React.ReactNode;
  onChange: (file: File | null) => void;
  value?: File | null;
  existingImageUrl?: string | null;
  variant?: "profile" | "gathering";
}

export function ImageUpload({
  id,
  placeholder,
  children,
  onChange,
  existingImageUrl,
  variant = "profile",
}: FormImageUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0] || null;
    onChange?.(file);

    if (!file) {
      setPreviewUrl(null);
      return;
    }

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      const base64Image =
        typeof fileReader.result === "string" ? fileReader.result : null;
      setPreviewUrl(base64Image);
    };
  };

  const handleRemoveImage = (): void => {
    onChange(null);
    setPreviewUrl(null);
  };

  const currentImageUrl = previewUrl || existingImageUrl;

  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith("blob:"))
        URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const wrapperClass =
    variant === "gathering"
      ? "h-full w-full"
      : "flex flex-col items-center gap-3";

  const containerClass =
    variant === "gathering"
      ? "flex h-full w-full items-center justify-center overflow-hidden"
      : "relative flex h-37.5 w-37.5 items-center justify-center overflow-hidden rounded-full border-2 border-gray-200 transition-colors hover:border-gray-300";

  const imageProps =
    variant === "gathering"
      ? { width: 456, height: 357, className: "object-cover w-full h-full" }
      : { fill: true, sizes: "150px" };

  return (
    <div className={wrapperClass}>
      <div
        className={`group relative ${variant === "gathering" ? "h-full w-full" : ""}`}
      >
        <input
          type="file"
          id={id}
          className="sr-only"
          onChange={handleFileChange}
          accept="image/*"
        />
        <label
          htmlFor={id}
          className={`relative cursor-pointer ${variant === "gathering" ? "block h-full w-full" : ""}`}
        >
          <div className={containerClass}>
            <ImageWithFallback
              src={currentImageUrl || null}
              alt="업로드 사진 미리보기"
              {...imageProps}
              renderFallback={() => children}
            />
          </div>
          <EditButton />
        </label>

        {currentImageUrl && <RemoveButton onClick={handleRemoveImage} />}
      </div>

      {placeholder && (
        <p className="text-center text-sm text-gray-600">{placeholder}</p>
      )}
    </div>
  );
}
