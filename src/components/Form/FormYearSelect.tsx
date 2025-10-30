"use client";

import React, { useEffect, useMemo, useState } from "react";

import ChevronDownIcon from "@/assets/icons/arrow-down.svg";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { YEARS_OPTIONS } from "@/lib/constants/brtihdayDate";
import { cn } from "@/lib/utils";

interface FormYearSelectProps {
  id?: string;
  name: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

export function FormYearSelect({
  id,
  name,
  value,
  onValueChange,
  className,
}: FormYearSelectProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const options = useMemo(() => YEARS_OPTIONS, []);

  useEffect(() => {
    if (!open) return;
    const idx = value ? options.findIndex((y) => y === value) : 0;
    setActiveIndex(idx >= 0 ? idx : 0);
  }, [open, value, options]);

  const handleSelect = (val: string) => {
    onValueChange?.(val);
    setOpen(false);
  };

  return (
    <div className="flex w-full flex-col">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            id={id}
            type="button"
            className={cn(
              "bg-accent flex w-full items-center justify-between rounded-lg px-4 py-2.5 text-left",
              className,
            )}
          >
            <span className={cn("truncate", !value && "text-muted-foreground")}>
              {value || "연도를 선택해주세요"}
            </span>
            <ChevronDownIcon className="text-muted-foreground size-4" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-2">
          <div
            className="scrollbar-hidden max-h-64 overflow-y-auto"
            role="listbox"
            aria-activedescendant={`${name}-opt-${activeIndex}`}
          >
            <ul className="space-y-1">
              {options.map((label, idx) => (
                <li key={label} id={`${name}-opt-${idx}`}>
                  <button
                    type="button"
                    onClick={() => handleSelect(label)}
                    className={cn(
                      "relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none",
                      "hover:bg-muted",
                      (value === label || activeIndex === idx) &&
                        "bg-primary/10 text-primary",
                    )}
                    role="option"
                    aria-selected={value === label || activeIndex === idx}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </PopoverContent>
      </Popover>
      <input type="hidden" name={name} value={value ?? ""} readOnly />
    </div>
  );
}
