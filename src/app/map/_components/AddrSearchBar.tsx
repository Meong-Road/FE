"use client";

import { useState } from "react";

import { getTopGeocode } from "@/lib/api/geocode";
import type { GeocodedItem } from "@/lib/types/geocode";

type Props = { onPick: (item: GeocodedItem) => void };

export default function AddrSearchBar({ onPick }: Props) {
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function search() {
    const query = userInput.trim();
    if (query.length < 2) return;

    setLoading(true);

    try {
      const top = await getTopGeocode(query);
      if (!top) {
        console.log("geocode 결과 없음");
        return;
      }

      console.log("주소: ", top);
      onPick(top);
    } catch (error) {
      console.error("error", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex gap-2">
      <input
        className="flex-1 rounded-2xl border px-4 py-2"
        placeholder="입력 예시: 논현로 565"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
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
