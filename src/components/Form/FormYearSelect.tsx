"use client";

import { YEARS_OPTIONS } from "@/lib/constants/brtihdayDate";

import { FormComboboxSelect } from "./FormComboboxSelect";

interface FormYearSelectProps {
  id?: string;
  name: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

export function FormYearSelect({
  id,
  name,
  value,
  onValueChange,
  className,
}: FormYearSelectProps) {
  return (
    <FormComboboxSelect
      id={id}
      name={name}
      value={value}
      onValueChange={onValueChange}
      options={YEARS_OPTIONS}
      placeholder="연도를 선택해주세요"
      className={className}
      maxItems={21}
    />
  );
}
