import React from "react";

interface ModalSelectProps {
  id?: string;
  name: string;
  placeholder: string;
  options: string[] | number[];
  className?: string;
}

export function Select({
  id,
  name,
  placeholder,
  options,
  className,
}: ModalSelectProps) {
  return (
    <select name={name} className={className} id={id}>
      <option>{placeholder}</option>
      {options.map((option, index) => (
        <option key={index}>{option}</option>
      ))}
    </select>
  );
}
