import React from "react";

import { days, months, years } from "../../lib/constants/brtihdayDate";
import { Select } from "../Form/FormSelect";

interface ModalDateSelectProps {
  name: string;
  value?: {
    year: number;
    month: number;
    day: number;
  };
  onChange?: (value: { year: number; month: number; day: number }) => void;
}

export function ModalDateSelect({
  name,
  value,
  onChange,
}: ModalDateSelectProps) {
  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const year = Number(e.target.value);
    onChange?.({ year, month: value?.month || 0, day: value?.day || 0 });
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const month = Number(e.target.value);
    onChange?.({ year: value?.year || 0, month, day: value?.day || 0 });
  };

  const handleDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const day = Number(e.target.value);
    onChange?.({ year: value?.year || 0, month: value?.month || 0, day });
  };

  return (
    <div className="w-full">
      <div className="flex w-full gap-2.5">
        <Select
          name={`${name}.year`}
          placeholder="년"
          options={years}
          value={value?.year}
          onChange={handleYearChange}
          className="bg-accent flex-1 rounded-xl px-1 py-2"
        />
        <Select
          name={`${name}.month`}
          placeholder="월"
          options={months}
          value={value?.month}
          onChange={handleMonthChange}
          className="bg-accent flex-1 rounded-xl px-1 py-2"
        />
        <Select
          name={`${name}.day`}
          placeholder="일"
          options={days}
          value={value?.day}
          onChange={handleDayChange}
          className="bg-accent flex-1 rounded-xl px-1 py-2"
        />
      </div>
    </div>
  );
}
