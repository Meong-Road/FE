import React from "react";

import EditIcon from "../../assets/icons/edit-icon.svg";
import Dog from "../../assets/images/dog.svg";

interface ModalImageUploadProps {
  id?: string;
  placeholder?: string;
}

export function ModalImageUpload({ id, placeholder }: ModalImageUploadProps) {
  return (
    <div className="relative my-10 flex flex-col items-center gap-2">
      <input type="file" id={id} className="sr-only" />
      <div className="flex h-37.5 w-37.5 items-center justify-center rounded-full border-2 border-[#DDD]">
        <Dog />
      </div>
      <label htmlFor={id}>
        <div className="border-primary absolute top-28 right-0 flex h-10 w-10 items-center justify-center rounded-full border-2 bg-white">
          <EditIcon />
        </div>
      </label>
      <div>{placeholder}</div>
    </div>
  );
}
