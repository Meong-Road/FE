"use client";

import SortingArrows from "@/assets/icons/sorting-arrows.svg";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSearchParamsState } from "@/hooks/useSearchParamsState";
import { SORT_OPTIONS } from "@/lib/constants/option";

interface SortBySelectorProps {
  onSortChange?: (value: string) => void;
}
export default function SortBySelector({ onSortChange }: SortBySelectorProps) {
  const {
    params: { sort },
    setParams,
  } = useSearchParamsState();

  const handleSortChange = (value: string) => {
    onSortChange?.(value);
    setParams({ sort: value, page: "0" }); // 정렬 기준 변경 시 첫 페이지로
  };

  return (
    <Select value={sort} onValueChange={handleSortChange}>
      <SelectTrigger className="cursor-pointer">
        <SortingArrows className="hidden size-4 sm:block" />
        <SelectValue placeholder={SORT_OPTIONS[0].label} />
      </SelectTrigger>
      <SelectContent>
        {SORT_OPTIONS.map((option) => (
          <SelectItem key={option.id} value={option.id}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
