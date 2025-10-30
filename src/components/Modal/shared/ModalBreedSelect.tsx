import React from "react";

import { DOG_BREEDS_OPTIONS } from "../../../lib/constants/dogBreed";
import { Form } from "../../Form";

interface ModalBreedSelectProps {
  name: string;
  id?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

export function ModalBreedSelect({
  name,
  id,
  value,
  onValueChange,
}: ModalBreedSelectProps) {
  return (
    <div className="flex w-full flex-col">
      <Form.Select
        id={id}
        name={name}
        placeholder="견종을 선택해주세요"
        options={DOG_BREEDS_OPTIONS}
        value={value}
        onValueChange={onValueChange}
        className="bg-accent flex-1 rounded-lg px-4 py-2.5"
      />
    </div>
  );
}
