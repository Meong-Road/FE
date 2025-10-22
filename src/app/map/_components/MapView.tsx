"use client";

import { useEffect, useRef } from "react";

type NaverMap = {
  setCenter: (pos: unknown) => void;
  setZoom: (level: number, animated?: boolean) => void;
  Marker: new (options: { position: unknown; map: NaverMap }) => unknown;
};

type NaverMapsNS = {
  Map: new (el: HTMLElement, options?: Record<string, unknown>) => NaverMap;
  LatLng: new (lat: number, lon: number) => unknown;
};

declare global {
  interface Window {
    naver?: { maps: NaverMapsNS };
  }
}

type Props = {
  lat: number | null;
  lon: number | null;
};

export function MapView({ lat, lon }: Props) {
  const boxRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<NaverMap | null>(null);
  const markerRef = useRef<unknown | null>(null);

  useEffect(() => {
    if (!boxRef.current || !window.naver?.maps) {
      return;
    }

    const { naver } = window;

    mapRef.current = new naver.maps.Map(boxRef.current, {
      center: new naver.maps.LatLng(37.5666805, 126.9784147),
      zoom: 16,
    });
  }, []);

  useEffect(() => {
    if (!window.naver?.maps || !mapRef.current) {
      return;
    }

    if (lat == null || lon == null) {
      return;
    }

    const { naver } = window;
    const pos = new naver.maps.LatLng(lat, lon);

    mapRef.current.setCenter(pos);
    mapRef.current.setZoom(16, true);

    if (!markerRef.current) {
      markerRef.current = new naver.maps.Marker({
        position: pos,
        map: mapRef.current,
      });
    } else {
      markerRef.current.setPosition(pos);
    }
  }, [lat, lon]);

  return (
    <div
      ref={boxRef}
      className="w-full rounded-2xl border"
      style={{ height: 360 }}
    ></div>
  );
}
