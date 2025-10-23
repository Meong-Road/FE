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
  showRemoveButton?: boolean;
  // 커스터마이징 props
  editButtonSize?: "sm" | "md" | "lg";
  editButtonVariant?: "primary" | "secondary" | "outline";
  editButtonClassName?: string;
  removeButtonSize?: "sm" | "md" | "lg";
  removeButtonVariant?: "zinc" | "gray" | "red";
  removeButtonClassName?: string;
  containerClassName?: string;
  imageContainerClassName?: string;
}

export function FormImageUpload({
  id,
  placeholder,
  children,
  onChange,
  existingImageUrl,
  showRemoveButton = true,
  editButtonSize = "lg",
  editButtonVariant = "primary",
  editButtonClassName = "",
  removeButtonSize = "md",
  removeButtonVariant = "zinc",
  removeButtonClassName = "",
  containerClassName = "",
  imageContainerClassName = "",
}: FormImageUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0] || null;
    onChange?.(file);

    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleRemoveImage = (): void => {
    onChange(null);
    setPreviewUrl(null);
  };

  const currentImageUrl = previewUrl || existingImageUrl;

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  return (
    <div className={`flex flex-col items-center gap-3 ${containerClassName}`}>
      <div className="relative">
        <input
          type="file"
          id={id}
          className="sr-only"
          onChange={handleFileChange}
          accept="image/*"
        />
        <label htmlFor={id} className="relative cursor-pointer">
          <div
            className={`flex h-37.5 w-37.5 items-center justify-center overflow-hidden rounded-full border-2 border-gray-200 transition-colors hover:border-gray-300 ${imageContainerClassName}`}
          >
            <ImageWithFallback
              src={currentImageUrl || null}
              alt="업로드 사진 미리보기"
              width={150}
              height={150}
              className="h-full w-full object-cover"
              renderFallback={() => children}
            />
          </div>
          <EditButton
            size={editButtonSize}
            variant={editButtonVariant}
            className={editButtonClassName}
          />
        </label>

        {showRemoveButton && currentImageUrl && (
          <RemoveButton
            onClick={handleRemoveImage}
            size={removeButtonSize}
            variant={removeButtonVariant}
            className={removeButtonClassName}
          />
        )}
      </div>

      {placeholder && (
        <p className="text-center text-sm text-gray-600">{placeholder}</p>
      )}
    </div>
  );
}
