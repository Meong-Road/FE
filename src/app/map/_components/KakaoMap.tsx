"use client";

import { useRef } from "react";

import useKakaoMap from "../_hooks/useKakaoMap";

interface Props {
  input: string;
}

export default function KakaoMap({ input }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);

  useKakaoMap({ mapRef, input });

  return (
    <div
      ref={mapRef}
      style={{ width: "100%", height: "300px" }}
      className="rounded-2xl border"
    />
  );
}
