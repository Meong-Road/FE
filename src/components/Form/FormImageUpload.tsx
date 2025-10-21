"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

import EditIcon from "../../assets/icons/edit-icon.svg";

interface ModalImageUploadProps {
  id?: string;
  placeholder?: string;
  children: React.ReactNode;
  onChange: (file: File | null) => void;
  value?: File | null;
  existingImageUrl?: string;
}

export function ImageUpload({
  id,
  placeholder,
  children,
  onChange,
  existingImageUrl,
}: ModalImageUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onChange?.(file);

    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else setPreviewUrl(null);
  };

  const currentImageUrl = previewUrl || existingImageUrl;

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  return (
    <div className="my-10 flex flex-col items-center gap-2">
      <input
        type="file"
        id={id}
        className="sr-only"
        onChange={handleFileChange}
      />
      <label htmlFor={id} className="relative">
        <div className="flex h-37.5 w-37.5 items-center justify-center rounded-full border-2 border-[#DDD]">
          {currentImageUrl ? (
            <Image
              src={currentImageUrl}
              alt="업로드 사진 미리보기"
              width={150}
              height={150}
              className="h-full w-full overflow-hidden rounded-full object-cover"
            />
          ) : (
            children
          )}
        </div>
        <div className="border-primary absolute top-28 right-0 flex h-10 w-10 items-center justify-center rounded-full border-2 bg-white">
          <EditIcon />
        </div>
      </label>
      <div>{placeholder}</div>
    </div>
  );
}
