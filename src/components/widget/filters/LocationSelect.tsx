"use client";

import ChevronDownIcon from "@/assets/icons/arrow-down.svg";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSearchParamsState } from "@/hooks/useSearchParamsState";
import { LOCATION_OPTIONS } from "@/lib/constants/option";

interface LocationSelectProps {
  onLocationChange?: (location: string) => void;
}

export function LocationSelect({ onLocationChange }: LocationSelectProps) {
  const {
    params: { location },
    setParams,
  } = useSearchParamsState({
    location: LOCATION_OPTIONS[0].id,
  });

  const handleLocationChange = (location: string) => {
    onLocationChange?.(location);
    setParams({ location, page: "0" }); // 지역 변경 시 첫 페이지로
  };

  return (
    <Select value={location} onValueChange={handleLocationChange}>
      <SelectTrigger className="w-30">
        <SelectValue placeholder={location} />
        <ChevronDownIcon className="size-6" />
      </SelectTrigger>
      <SelectContent className="max-h-[300px] overflow-y-auto">
        {LOCATION_OPTIONS.map((option) => (
          <SelectItem key={option.id} value={option.id}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
