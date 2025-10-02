import React from "react";

import EditIcon from "../../assets/icons/edit-icon.svg";

interface ModalImageUploadProps {
  id?: string;
  placeholder?: string;
  children: React.ReactNode;
  onChange: (file: File | null) => void;
  value?: File | null;
}

export function ImageUpload({
  id,
  placeholder,
  children,
  onChange,
}: ModalImageUploadProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onChange?.(file);
  };

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
          {children}
        </div>
        <div className="border-primary absolute top-28 right-0 flex h-10 w-10 items-center justify-center rounded-full border-2 bg-white">
          <EditIcon />
        </div>
      </label>
      <div>{placeholder}</div>
    </div>
  );
}
