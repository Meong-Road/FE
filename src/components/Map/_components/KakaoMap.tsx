"use client";

import { useRef } from "react";

import ResetLocationIcon from "@/assets/icons/reset-location.svg";

import useKakaoMap from "../_hooks/useKakaoMap";

interface Props {
  input: string;
}

export default function KakaoMap({ input }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);

  useKakaoMap({ mapRef, input });

  return (
    <div className="relative">
      <div
        ref={mapRef}
        style={{ width: "100%", height: "350px" }}
        className="rounded-2xl border"
      />

      <button
        type="button"
        className="absolute bottom-4 left-4 z-10 rounded-full shadow"
      >
        <ResetLocationIcon />
      </button>
    </div>
  );
}
