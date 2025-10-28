"use client";
import { useState } from "react";
import { DateRange } from "react-day-picker";

import Filter from "@/assets/icons/filter.svg";
import { Radio } from "@/components/Form/FormRadio";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DAY_MAP_KR, DAY_OF_WEEK } from "@/lib/constants/date";
import { EGatheringType } from "@/lib/types/gatherings";
import { cn } from "@/lib/utils";

interface FilterPopoverProps {
  type: EGatheringType;
}

interface FilterPopoverTitleProps {
  title: string;
}

function FilterPopoverTitle({ title }: FilterPopoverTitleProps) {
  return <div className="text-sm font-semibold">{title}</div>;
}

export default function FilterPopover({ type }: FilterPopoverProps) {
  const [date, setDate] = useState<DateRange>();

  return (
    <Popover>
      <PopoverTrigger className={cn("cursor-pointer")}>
        <Filter className="hidden size-4 sm:block" />
        상세 필터
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-8 p-6" align="start">
        <div className="flex flex-col gap-2">
          <FilterPopoverTitle title="반려견" />
          <Radio
            className="flex flex-col gap-2 text-sm"
            name="pet-condition"
            options={[
              {
                id: "with-pet",
                value: "with-pet",
                label: "함께 산책할 반려견이 있어요",
              },
              {
                id: "without-pet",
                value: "without-pet",
                label: "반려견 없이 참여하고 싶어요",
              },
            ]}
          />
        </div>

        <div className="flex items-center gap-2">
          <Checkbox id="show-closed" />
          <label htmlFor="show-closed" className="text-sm font-medium">
            마감된 모임도 볼래요
          </label>
        </div>

        {type === EGatheringType.QUICK && (
          <div className="flex flex-col gap-2">
            <FilterPopoverTitle title="모임 날짜" />
            <Calendar selected={date} onSelect={setDate} mode="range" />
          </div>
        )}

        {type === EGatheringType.REGULAR && (
          <div className="flex flex-col gap-2">
            <FilterPopoverTitle title="요일" />
            <Radio
              className="flex gap-x-1 text-sm"
              name="day-of-week"
              options={DAY_OF_WEEK.map((day) => ({
                id: day,
                value: day,
                label: DAY_MAP_KR[day],
              }))}
            />
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
