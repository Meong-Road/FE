"use client";

import { useAddrSearch } from "@/app/map/_hooks/useAddrSearch";
import { GeocodedAddressType } from "@/app/map/_types/geocodings";

type Props = { onPick: (item: GeocodedAddressType) => void };

export default function AddrSearchBar({ onPick }: Props) {
  const { inputAddr, setInputAddr, loading, search } = useAddrSearch(onPick);

  return (
    <div className="flex gap-2">
      <input
        className="flex-1 rounded-2xl border px-4 py-2"
        placeholder="입력 예시: 논현로 565"
        value={inputAddr}
        onChange={(e) => setInputAddr(e.target.value)}
      />
      <button
        className="rounded-2xl bg-black px-4 py-2 text-white disabled:opacity-50"
        onClick={search}
        disabled={loading}
      >
        {loading ? "검색 중" : "검색"}
      </button>
    </div>
  );
}
