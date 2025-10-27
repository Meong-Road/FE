"use client";
import { useState } from "react";
import { DateRange } from "react-day-picker";

import Filter from "@/assets/icons/filter.svg";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DAY_MAP_KR, DAY_OF_WEEK } from "@/lib/constants/date";
import { EGatheringType } from "@/lib/types/gatherings";
import { cn } from "@/lib/utils";

import ClosedCheckbox from "./ClosedCheckbox";

interface FilterPopoverProps {
  type: EGatheringType;
}

interface FilterPopoverTitleProps {
  title: string;
}

function FilterPopoverTitle({ title }: FilterPopoverTitleProps) {
  return <div className="font-semibold">{title}</div>;
}

export default function FilterPopover({ type }: FilterPopoverProps) {
  const [date, setDate] = useState<DateRange>();
  const [dayOfWeek, setDayOfWeek] = useState<string[]>([]);
  const [isClosed, setIsClosed] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange>();

  return (
    <Popover>
      <PopoverTrigger className={cn("cursor-pointer")}>
        <Filter className="hidden size-4 sm:block" />
        상세 필터
      </PopoverTrigger>
      <PopoverContent className="flex w-80 flex-col gap-10 p-6" align="start">
        <ClosedCheckbox />

        {type === EGatheringType.QUICK && (
          <div className="flex flex-col gap-2">
            <FilterPopoverTitle title="모임 가능한 날짜" />
            <Calendar
              selected={date}
              onSelect={setDate}
              mode="range"
              className="w-full"
            />
          </div>
        )}

        {type === EGatheringType.REGULAR && (
          <div className="flex flex-col gap-2">
            <FilterPopoverTitle title="모임 가능한 요일" />
            <div className="grid grid-cols-7 gap-1.5">
              {DAY_OF_WEEK.map((day) => (
                <div key={day} className="flex items-center justify-center">
                  <input
                    type="checkbox"
                    id={day}
                    className="hidden"
                    onClick={() => setDayOfWeek([...dayOfWeek, day])}
                  />
                  <label
                    htmlFor={day}
                    className={cn(
                      "flex w-full items-center justify-center rounded-lg p-2",
                      dayOfWeek.includes(day)
                        ? "bg-primary font-medium text-white"
                        : "bg-[#EEEEEE]",
                    )}
                  >
                    {DAY_MAP_KR[day]}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
