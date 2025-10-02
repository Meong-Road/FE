import React from "react";

import Modal from "../Modal";

interface RadioOption {
  id: string;
  label: string;
  value: string;
}

interface ModalRaidoInputProps {
  label: string;
  required?: boolean;
  name: string;
  options: RadioOption[];
  defaultChecked?: string;
}

export function Radio({ name, options, defaultChecked }: ModalRaidoInputProps) {
  return (
    <div className="w-full">
      <div className="flex w-full gap-2.5">
        {options.map((option, index) => (
          <div className="flex-1" key={index}>
            <input
              type="radio"
              name={name}
              id={option.id}
              className="peer sr-only"
              defaultChecked={defaultChecked === option.value}
            />
            <label
              htmlFor={option.id}
              className="bg-accent peer-checked:bg-primary inline-flex w-full cursor-pointer items-center justify-center rounded-xl py-2 peer-checked:font-medium peer-checked:text-white"
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
