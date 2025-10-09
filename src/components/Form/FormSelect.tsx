import React from "react";

interface ModalSelectProps {
  id?: string;
  name: string;
  placeholder: string;
  options: string[] | number[];
  className?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function Select({
  id,
  name,
  placeholder,
  options,
  className,
  value,
  onChange,
}: ModalSelectProps) {
  return (
    <select
      name={name}
      className={className}
      id={id}
      value={value || ""}
      onChange={onChange}
    >
      <option value="">{placeholder}</option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
