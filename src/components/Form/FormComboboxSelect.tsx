"use client";

import React, { useEffect, useMemo, useState } from "react";

import ChevronDownIcon from "@/assets/icons/arrow-down.svg";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface FormComboboxSelectProps {
  id?: string;
  name: string;
  value?: string;
  placeholder?: string;
  searchPlaceholder?: string;
  onValueChange?: (value: string) => void;
  options: readonly string[];
  maxItems?: number;
  className?: string;
}

export function FormComboboxSelect({
  id,
  name,
  value,
  placeholder = "선택해주세요",
  searchPlaceholder = "검색하여 선택...",
  onValueChange,
  options,
  maxItems = 20,
  className,
}: FormComboboxSelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const selectedLabel = value ?? "";
  const memoOptions = useMemo(() => options, [options]);

  const filtered = useMemo(() => {
    if (!query.trim()) return memoOptions.slice(0, maxItems);
    const q = query.toLowerCase();
    return memoOptions
      .filter((label) => label.toLowerCase().includes(q))
      .slice(0, maxItems);
  }, [query, memoOptions, maxItems]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    if (!open) return;
    const idx = value ? filtered.findIndex((l) => l === value) : 0;
    setActiveIndex(idx >= 0 ? idx : 0);
  }, [open, filtered, value]);

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
              {selectedLabel || placeholder}
            </span>
            <ChevronDownIcon className="text-muted-foreground size-4" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-2">
          <div className="mb-2">
            <input
              name={`${name}-search`}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  setActiveIndex((i) =>
                    Math.min(i + 1, Math.max(filtered.length - 1, 0)),
                  );
                } else if (e.key === "ArrowUp") {
                  e.preventDefault();
                  setActiveIndex((i) => Math.max(i - 1, 0));
                } else if (e.key === "Enter") {
                  e.preventDefault();
                  const target = filtered[activeIndex];
                  if (target) handleSelect(target);
                } else if (e.key === "Escape") {
                  e.preventDefault();
                  setOpen(false);
                }
              }}
              placeholder={searchPlaceholder}
              className="bg-accent w-full rounded-md px-3 py-2 text-sm outline-hidden"
            />
          </div>
          <div
            className="scrollbar-hidden max-h-64 overflow-y-auto"
            role="listbox"
            aria-activedescendant={`${name}-opt-${activeIndex}`}
          >
            {filtered.length === 0 ? (
              <div className="text-muted-foreground py-6 text-center text-sm">
                검색 결과가 없어요
              </div>
            ) : (
              <ul className="space-y-1">
                {filtered.map((label, idx) => (
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
            )}
          </div>
        </PopoverContent>
      </Popover>
      <input type="hidden" name={name} value={value ?? ""} readOnly />
    </div>
  );
}
