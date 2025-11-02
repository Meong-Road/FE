"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

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
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { sort } = useSearchParamsState();

  const handleSortChange = (value: string) => {
    onSortChange?.(value);
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", value);
    params.set("page", "0"); // 정렬 기준 변경 시 첫 페이지로

    router.push(`${pathname}?${params.toString()}`);
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
