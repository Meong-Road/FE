"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { formatDateToISOString } from "@/lib/utils/dateTime";

interface Calendar24Props {
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
}

export default function Calendar24({
  value,
  onChange,
  disabled,
}: Calendar24Props) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [time, setTime] = React.useState<string>("10:00");

  // value prop이 변경될 때 내부 상태 동기화
  React.useEffect(() => {
    if (value) {
      const [datePart, timePart] = value.split("T");
      setDate(new Date(datePart));
      setTime(timePart || "10:00");
    } else {
      setDate(undefined);
      setTime("10:00");
    }
  }, [value]);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (selectedDate && onChange) {
      const dateString = formatDateToISOString(selectedDate);
      onChange(`${dateString}T${time}`);
    }
    setOpen(false);
  };

  const handleTimeChange = (selectedTime: string) => {
    setTime(selectedTime);
    if (date && onChange) {
      const dateString = formatDateToISOString(date);
      onChange(`${dateString}T${selectedTime}`);
    }
  };

  return (
    <div className="flex w-full gap-4">
      <div className="flex w-full flex-1 flex-col gap-3">
        <Label htmlFor="date-picker" className="hidden px-1">
          Date
        </Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="date-picker"
              className="focus:border-primary h-10 w-full justify-between rounded-xl border-[#edf4fb] bg-[#edf4fb] px-4 py-2.5 font-normal hover:bg-[#e6f0f8]"
            >
              {date ? date.toLocaleDateString() : "모임 날짜를 선택해주세요"}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              onSelect={handleDateSelect}
              disabled={(date) => date < new Date()}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex w-full flex-1 flex-col gap-3">
        <Label htmlFor="time-picker" className="hidden px-1">
          Time
        </Label>
        <Input
          type="time"
          id="time-picker"
          step="1"
          value={time}
          onChange={(e) => handleTimeChange(e.target.value)}
          disabled={disabled}
          className="focus:border-primary h-10 w-full appearance-none rounded-xl border-[#edf4fb] bg-[#edf4fb] px-4 py-2.5 hover:bg-[#e6f0f8] [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
        />
      </div>
    </div>
  );
}
