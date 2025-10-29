"use client";

import { useRef } from "react";

import ResetLocationIcon from "@/assets/icons/reset-location.svg";
import { LocationType } from "@/lib/types/location";

import useKakaoMap from "../_hooks/useKakaoMap";

interface Props {
  place: kakao.maps.services.PlaceType | null;
  setLocation: (loc: LocationType) => void;
}

export default function MapView({ place, setLocation }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const { resetMap } = useKakaoMap({ mapRef, place, setLocation });

  return (
    <div className="relative">
      <div
        ref={mapRef}
        style={{ width: "100%", height: "350px" }}
        className="rounded-2xl border"
      />

      <button
        type="button"
        className="absolute bottom-5 left-6 z-1 rounded-full shadow"
        onClick={resetMap}
      >
        <ResetLocationIcon />
      </button>
    </div>
  );
}
