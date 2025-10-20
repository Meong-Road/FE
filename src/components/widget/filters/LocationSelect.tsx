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
import { SEOUL_ALL, SEOUL_DISTRICTS_WITH_ALL } from "@/lib/constants/location";

export function LocationSelect() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selectedLocation = searchParams.get("location") || undefined;

  const handleLocationChange = (location: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("location", location);
    params.set("page", "0"); // 지역 변경 시 첫 페이지로

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Select value={selectedLocation} onValueChange={handleLocationChange}>
      <SelectTrigger className="w-30">
        <SelectValue placeholder={selectedLocation || SEOUL_ALL} />
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
