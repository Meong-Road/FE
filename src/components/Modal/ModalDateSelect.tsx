import React from "react";

import { days, months, years } from "../../lib/constants/brtihdayDate";
import { Select } from "../Form/FormSelect";

interface ModalDateSelectProps {
  name: string;
}

export function ModalDateSelect({ name }: ModalDateSelectProps) {
  return (
    <div className="w-full">
      <div className="flex w-full gap-2.5">
        <Select
          name={`${name}-year`}
          placeholder="년"
          options={years}
          className="bg-accent flex-1 rounded-xl px-1 py-2"
        />
        <Select
          name={`${name}-year`}
          placeholder="월"
          options={months}
          className="bg-accent flex-1 rounded-xl px-1 py-2"
        />
        <Select
          name={`${name}-year`}
          placeholder="일"
          options={days}
          className="bg-accent flex-1 rounded-xl px-1 py-2"
        />
      </div>
    </div>
  );
}
