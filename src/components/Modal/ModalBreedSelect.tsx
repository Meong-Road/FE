import React from "react";

import { dogBreeds } from "../../lib/constants/dogBreed";
import { Form } from "../Form";

interface ModalBreedSelectProps {
  name: string;
  htmlFor?: string;
}

export function ModalBreedSelect({ name, htmlFor }: ModalBreedSelectProps) {
  return (
    <div className="flex w-full flex-col">
      <Form.Select
        id={htmlFor}
        placeholder="견종을 선택해주세요"
        name={name}
        options={dogBreeds}
        className="bg-accent flex-1 rounded-xl px-1 py-2"
      />
    </div>
  );
}
