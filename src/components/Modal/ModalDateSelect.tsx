import React from "react";

import { days, months, years } from "./date";
import { FormLabel } from "./FormLabel";
import { ModalSelect } from "./ModalSelect";

interface ModalDateSelectProps {
  label: string;
  required?: boolean;
  name: string;
}

export function ModalDateSelect({
  label,
  required,
  name,
}: ModalDateSelectProps) {
  return (
    <div className="w-full">
      <FormLabel label={label} required={required} />
      <div className="flex w-full gap-2.5">
        <ModalSelect
          name={`${name}-year`}
          placeholder="년"
          options={years}
          className="bg-accent flex-1 rounded-xl px-1 py-2"
        />
        <ModalSelect
          name={`${name}-year`}
          placeholder="월"
          options={months}
          className="bg-accent flex-1 rounded-xl px-1 py-2"
        />
        <ModalSelect
          name={`${name}-year`}
          placeholder="일"
          options={days}
          className="bg-accent flex-1 rounded-xl px-1 py-2"
        />
      </div>
    </div>
  );
}
