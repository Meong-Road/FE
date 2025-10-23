"use client";

import { useNaverMap } from "@/app/map/_hooks/useNaverMap";

type Props = {
  lat: number | null;
  lon: number | null;
};

export function MapView({ lat, lon }: Props) {
  const boxRef = useNaverMap(lat, lon);

  return (
    <div
      ref={boxRef}
      className="w-full rounded-2xl border"
      style={{ height: 360 }}
    ></div>
  );
}
