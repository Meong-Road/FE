"use client";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import Filter from "@/assets/icons/filter.svg";
import Radio from "@/components/common/Radio";
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
  PET_REQUIRED_OPTIONS,
} from "@/lib/constants/option";
import { EGatheringType } from "@/lib/types/gatherings";
import { cn } from "@/lib/utils";
import { formatDateToISOString } from "@/lib/utils/dateTime";

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
  const { isPetRequired, isClosed, dayOfWeek, startDate, endDate } =
    useSearchParamsState({
      isPetRequired: PET_REQUIRED_OPTIONS[0].id,
      isClosed: IS_CLOSED_OPTIONS[0].id,
    });

  const [date, setDate] = useState<DateRange>({
    from: startDate ? new Date(startDate) : undefined,
    to: endDate ? new Date(endDate) : undefined,
  });

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleFilterChange = (
    param: { key: string; value?: unknown } | { key: string; value: unknown }[],
  ) => {
    const setParam = (key: string, value: unknown) => {
      if (value) {
        params.set(key, String(value));
        params.set("page", "0"); // 필터 변경 시 첫 페이지로
      }
    };

    const params = new URLSearchParams(searchParams.toString());
    if (Array.isArray(param)) {
      param.forEach(({ key, value }) => setParam(key, value));
    } else {
      setParam(param.key, param.value);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    handleFilterChange([
      {
        key: "startDate",
        value: date.from ? `${formatDateToISOString(date.from)}` : undefined,
      },
      {
        key: "endDate",
        value: date.to ? `${formatDateToISOString(date.to)}` : undefined,
      },
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  return (
    <Popover>
      <PopoverTrigger className={cn("cursor-pointer")}>
        <Filter className="hidden size-4 sm:block" />
        상세 필터
      </PopoverTrigger>
      <PopoverContent className="flex w-80 flex-col gap-10 p-6" align="start">
        <ClosedCheckbox
          checked={isClosed === EIsClosed.SHOW_CLOSED}
          onCheckedChange={(checked) =>
            handleFilterChange({
              key: "isClosed",
              value: checked ? EIsClosed.SHOW_CLOSED : EIsClosed.HIDE_CLOSED,
            })
          }
        />

        <div className="flex flex-col gap-2">
          <FilterPopoverTitle title="반려견" />
          <Radio
            className="flex flex-col gap-2 text-sm"
            name="isPetRequired"
            options={PET_REQUIRED_OPTIONS}
            value={isPetRequired}
            onChange={(option) => {
              handleFilterChange({ key: "isPetRequired", value: option.id });
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
              required
            />
          </div>
        )}

        {type === EGatheringType.REGULAR && (
          <div className="flex flex-col gap-2">
            <FilterPopoverTitle title="모임 가능한 요일" />
            <DayPicker
              value={dayOfWeek ? JSON.parse(dayOfWeek) : []}
              onChange={(dayOfWeek) =>
                handleFilterChange({
                  key: "dayOfWeek",
                  value: JSON.stringify(dayOfWeek),
                })
              }
            />
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
