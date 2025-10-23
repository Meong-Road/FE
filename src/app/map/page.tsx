// temp page to test -> 삭제 예정
"use client";

import { useState } from "react";

import { AddrSearchBar } from "@/app/map/_components/AddrSearchBar";
import { MapView } from "@/app/map/_components/MapView";

const DEFAULT_COORD = {
  lat: 37.5666805,
  lon: 126.9784147,
};

export default function MapTestPage() {
  const [pos, setPos] = useState<{ lat: number; lon: number }>(DEFAULT_COORD);
  return (
    <>
      <AddrSearchBar
        onPick={(addr) => {
          setPos({ lat: addr.lat, lon: addr.lon });
        }}
      />
      <div className="mt-6">
        <MapView lat={pos.lat} lon={pos.lon} />
      </div>
    </>
  );
}
