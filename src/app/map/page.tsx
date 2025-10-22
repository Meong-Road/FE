// temp page to test -> 삭제 예정
"use client";

import { useState } from "react";

import AddrSearchBar from "@/app/map/_components/AddrSearchBar";
import { MapView } from "@/app/map/_components/MapView";

export default function MapTestPage() {
  const [pos, setPos] = useState<{ lat: number | null; lon: number | null }>({
    lat: null,
    lon: null,
  });
  return (
    <>
      <AddrSearchBar
        onPick={(item) => {
          setPos({ lat: item.lat, lon: item.lon });
        }}
      />
      <div className="mt-6">
        <MapView lat={pos.lat} lon={pos.lon} />
      </div>
    </>
  );
}
