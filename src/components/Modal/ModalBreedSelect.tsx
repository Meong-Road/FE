import React from "react";

import { dogBreeds } from "../../lib/constants/dogBreed";

import { FormLabel } from "./FormLabel";
import { ModalSelect } from "./ModalSelect";

interface ModalBreedSelectProps {
  label: string;
  required?: boolean;
  name: string;
}

export function ModalBreedSelect({
  label,
  required,
  name,
}: ModalBreedSelectProps) {
  return (
    <div className="flex w-full flex-col">
      <FormLabel label={label} required={required} />
      <ModalSelect
        placeholder="견종을 선택해주세요"
        name={name}
        options={dogBreeds}
        className="bg-accent flex-1 rounded-xl px-1 py-2"
      />
    </div>
  );
}
