"use client";

import { DOG_BREEDS_OPTIONS } from "@/lib/constants/dogBreed";

import { FormComboboxSelect } from "./FormComboboxSelect";

interface FormBreedSelectProps {
  id?: string;
  name: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  maxItems?: number;
}

export function FormBreedSelect({
  id,
  name,
  value,
  onValueChange,
  className,
  maxItems = 20,
}: FormBreedSelectProps) {
  return (
    <FormComboboxSelect
      id={id}
      name={name}
      value={value}
      onValueChange={onValueChange}
      options={DOG_BREEDS_OPTIONS}
      placeholder="견종을 선택해주세요"
      maxItems={maxItems}
      className={className}
    />
  );
}
