import React from "react";

import { YEARS_OPTIONS } from "../../../lib/constants/brtihdayDate";
import { Form } from "../../Form";

interface ModalDateSelectProps {
  name: string;
  id?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

export function ModalDateSelect({
  name,
  id,
  value,
  onValueChange,
}: ModalDateSelectProps) {
  return (
    <div className="flex w-full flex-col">
      <Form.Select
        id={id}
        name={name}
        placeholder="출생 연도를 선택해주세요"
        options={YEARS_OPTIONS}
        value={value}
        onValueChange={onValueChange}
        className="bg-accent flex-1 rounded-lg px-4 py-2.5"
      />
    </div>
  );
}
