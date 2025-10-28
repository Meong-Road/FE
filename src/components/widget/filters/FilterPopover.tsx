"use client";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import Filter from "@/assets/icons/filter.svg";
import { Radio } from "@/components/Form/FormRadio";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useSearchParamsState } from "@/hooks/useSearchParamsState";
import {
  EIsClosed,
  IS_CLOSED_OPTIONS,
  LOCATION_OPTIONS,
  PET_REQUIRED_OPTIONS,
  SORT_OPTIONS,
} from "@/lib/constants/option";
import { EGatheringType } from "@/lib/types/gatherings";
import { cn } from "@/lib/utils";

import ClosedCheckbox from "./ClosedCheckbox";
import DayPicker from "./DayPicker";

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

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { isPetRequired, isClosed, dayOfWeek } = useSearchParamsState({
    location: LOCATION_OPTIONS[0].id,
    sort: SORT_OPTIONS[0].id,
    isPetRequired: PET_REQUIRED_OPTIONS[0].id,
    isClosed: IS_CLOSED_OPTIONS[0].id,
    dayOfWeek: "[]",
  });

  const handleFilterChange = (key: string, value: unknown) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, String(value));
    params.set("page", "0"); // 필터 변경 시 첫 페이지로
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Popover>
      <PopoverTrigger className={cn("cursor-pointer")}>
        <Filter className="hidden size-4 sm:block" />
        상세 필터
      </PopoverTrigger>
      <PopoverContent className="flex w-80 flex-col gap-10 p-6" align="start">
        <ClosedCheckbox
          checked={isClosed === EIsClosed.HIDE_CLOSED}
          onCheckedChange={(checked) => handleFilterChange("isClosed", checked)}
        />

        <div className="flex flex-col gap-2">
          <FilterPopoverTitle title="반려견" />
          <Radio
            className="flex flex-col gap-2 text-sm"
            name="isPetRequired"
            options={PET_REQUIRED_OPTIONS}
            value={isPetRequired}
            onChange={(option) => {
              handleFilterChange("isPetRequired", option.value);
            }}
          />
        </div>

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
            <DayPicker
              value={JSON.parse(dayOfWeek)}
              onChange={(dayOfWeek) =>
                handleFilterChange("dayOfWeek", JSON.stringify(dayOfWeek))
              }
            />
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
