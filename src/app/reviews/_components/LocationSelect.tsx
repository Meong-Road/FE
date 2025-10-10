"use client";

import { useRouter, useSearchParams } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SEOUL_DISTRICTS = [
  "서울 전체",
  "강남구",
  "강동구",
  "강북구",
  "강서구",
  "광진구",
  "구로구",
  "금천구",
  "노원구",
  "도봉구",
  "동대문구",
  "동작구",
  "마포구",
  "서대문구",
  "서초구",
  "성동구",
  "성북구",
  "송파구",
  "양천구",
  "영등포구",
  "용산구",
  "은평구",
  "종로구",
  "중구",
  "중랑구",
];

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

    router.push(`/reviews?${params.toString()}`);
  };

  return (
    <Select
      value={selectedLocation || "서울 전체"}
      onValueChange={handleLocationChange}
    >
      <SelectTrigger className="w-[200px] cursor-pointer">
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
