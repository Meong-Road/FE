"use client";

import { useRef } from "react";

import ResetLocationIcon from "@/assets/icons/reset-location.svg";

import useKakaoMap from "../_hooks/useKakaoMap";

interface Props {
  input: string;
}

export default function KakaoMap({ input }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);

  const { resetMap } = useKakaoMap({ mapRef, input });

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
