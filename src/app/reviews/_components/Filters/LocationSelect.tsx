"use client";

import { useRouter, useSearchParams } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SEOUL_DISTRICTS } from "@/lib/constants/location";
import { PATH } from "@/lib/constants/path";

interface LocationSelectProps {
  selectedLocation: string;
}

export function LocationSelect({ selectedLocation }: LocationSelectProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleLocationChange = (location: string) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("location", location);

    params.set("page", "0"); // 지역 변경 시 첫 페이지로

    router.push(`${PATH.REVIEWS}?${params.toString()}`);
  };

  return (
    <Select
      value={selectedLocation || "서울 전체"}
      onValueChange={handleLocationChange}
    >
      <SelectTrigger className="w-30">
        <SelectValue placeholder={selectedLocation || "서울 전체"} />
      </SelectTrigger>
      <SelectContent className="max-h-[300px] overflow-y-auto">
        {SEOUL_DISTRICTS.map((district) => (
          <SelectItem key={district} value={district}>
            {district}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
