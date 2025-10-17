import React from "react";

import { years } from "../../lib/constants/brtihdayDate";
import { Form } from "../Form";

interface ModalDateSelectProps {
  name: string;
  htmlFor?: string;
  value?: number;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function ModalDateSelect({
  name,
  htmlFor,
  value,
  onChange,
}: ModalDateSelectProps) {
  return (
    <div className="flex w-full flex-col">
      <Form.Select
        id={htmlFor}
        name={name}
        placeholder="연도"
        options={years}
        value={value}
        onChange={onChange}
        className="bg-accent flex-1 rounded-lg px-4 py-2.5"
      />
    </div>
  );
}
