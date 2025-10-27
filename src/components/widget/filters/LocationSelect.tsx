"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import ChevronDownIcon from "@/assets/icons/arrow-down.svg";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSearchParamsState } from "@/hooks/useSearchParamsState";
import { SEOUL_ALL, SEOUL_DISTRICTS_WITH_ALL } from "@/lib/constants/location";

interface LocationSelectProps {
  onLocationChange?: (location: string) => void;
}

export function LocationSelect({ onLocationChange }: LocationSelectProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { location } = useSearchParamsState({
    location: SEOUL_ALL,
  });

  const handleLocationChange = (location: string) => {
    onLocationChange?.(location);

    const params = new URLSearchParams(searchParams.toString());
    params.set("location", location);
    params.set("page", "0"); // 지역 변경 시 첫 페이지로
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Select value={location} onValueChange={handleLocationChange}>
      <SelectTrigger className="w-30">
        <SelectValue placeholder={location} />
        <ChevronDownIcon className="size-6" />
      </SelectTrigger>
      <SelectContent className="max-h-[300px] overflow-y-auto">
        {SEOUL_DISTRICTS_WITH_ALL.map((district) => (
          <SelectItem key={district} value={district}>
            {district}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
