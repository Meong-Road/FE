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

export default function SortBySelector() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selectedSort = searchParams.get("sort") || undefined;

  const handleSortChange = (sort: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", sort);
    params.set("page", "0"); // 지역 변경 시 첫 페이지로

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Select value={selectedSort} onValueChange={handleSortChange}>
      <SelectTrigger className="cursor-pointer">
        <SortingArrows className="hidden size-4 sm:block" />
        <SelectValue placeholder="최신순" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="latest">최신순</SelectItem>
        <SelectItem value="close">마감 임박</SelectItem>
      </SelectContent>
    </Select>
  );
}
