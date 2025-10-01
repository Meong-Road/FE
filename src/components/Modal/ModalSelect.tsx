import React from "react";

interface ModalSelectProps {
  name: string;
  placeholder: string;
  options: string[] | number[];
  className?: string;
}

export function ModalSelect({
  name,
  placeholder,
  options,
  className,
}: ModalSelectProps) {
  return (
    <select name={name} className={className}>
      <option>{placeholder}</option>
      {options.map((option, index) => (
        <option key={index}>{option}</option>
      ))}
    </select>
  );
}
